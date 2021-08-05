module.exports = function BillWithSettings() {
    let smsCost = 0;
    let callCost = 0;
    let warningLevel = 0;
    let criticalLevel = 0;
    let total = 0;

    var callCostTotal = 0;
    var smsCostTotal = 0;

    let actionList = [];
    

    function setCallCost(callCosting) {
        callCost = callCosting;
    }

    function getCallCost() {
        return callCost;
    }

    function setSmsCost(smsCosting) {
        smsCost = smsCosting;
    }

    function getSmsCost() {
        return smsCost;
    }

    function setWarningLevel(warningLeveling) {
        warningLevel = warningLeveling;
    }

    function getWarningLevel() {
        return warningLevel;
    }

    function getWarningLevel1() {
        return warningLevel;
    }

    function setCriticalLevel(criticalLeveling) {
        criticalLevel = criticalLeveling;
    }

    function getCriticalLevel() {
        return criticalLevel;
    }

    function makeCall() {
        if (!hasReachedCriticalLevel()) {
            callCostTotal += callCost;
        }

    }


    function getTotalCost() {
        return callCostTotal + smsCostTotal;
    }

    function getTotalCallCost() {
        return callCostTotal;
    }

    function getTotalSmsCost() {
        return smsCostTotal;
    }

    function sendSms() {
        if (!hasReachedCriticalLevel()) {
            smsCostTotal += smsCost
        }

    }


    function hasReachedCriticalLevel() {
        return getTotalCost() >= getCriticalLevel();
    }

    function hasReachedCriticalLevel1() {
        return grandTotal() >= getCriticalLevel();
    }
    

    function totalClassName() {
        if (hasReachedCriticalLevel()) {
            return "danger";
        }

        if (getTotalCost() >= getWarningLevel()) {
            return "warning";
        }
    }

    function totalClassName1() {
        if (hasReachedCriticalLevel1()) {
            return "danger";
        }

        if (grandTotal() >= getWarningLevel1()) {
            return "warning";
        }
    }

    

    function radioType(bill) {
        if (bill === 'call') {
            makeCall();
        } else if (bill === 'sms') {
            sendSms();
        }
    }


    function setSettings(settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = Number(settings.warningLevel);
        criticalLevel = Number(settings.criticalLevel);
    }

    function getSettings
        () {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {
        var moment = require('moment');
        if (!stopageColor()) {
            var cost = 0;
            if (action === 'sms') {
                cost = smsCost;
            }
            else if (action === 'call') {
                cost = callCost;
            }
        
        if (action !== undefined) {

            actionList.push({
                type: action,
                cost,
                timestamp: moment().startOf("minute").fromNow()
            });
        }
        }
    }
    function actions() {
        return actionList;
    }

    function actionsFor(type) {
        console.log()
        const filteredActions = [];


        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];

            if (action.type === type) {

                filteredActions.push(action);
            }
        }
 
        return filteredActions;
     }

    function getTotal(type) {
        let total = 0;

        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];

            if (action.type === type) {

                total += action.cost;
            }
        }
        return total;
     }

    function grandTotal() {
        return getTotal('sms') + getTotal('call');
    }

    function totals() {
        let smsTotal = getTotal('sms')
        let callTotal = getTotal('call')

        return {
            smsTotal: smsTotal,
            callTotal: callTotal,
            grandTotal: grandTotal()
        }
    }

    function stopageColor() {

        return grandTotal() >= criticalLevel;
    }


    return {
        getCallCost,
        setCallCost,

        getSmsCost,
        setSmsCost,

        getWarningLevel,
        setWarningLevel,

        getCriticalLevel,
        setCriticalLevel,

        makeCall,

        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,

        sendSms,
        totalClassName,
        radioType,
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        stopageColor,
        getWarningLevel1,
        totalClassName1,
        hasReachedCriticalLevel1
    }
}