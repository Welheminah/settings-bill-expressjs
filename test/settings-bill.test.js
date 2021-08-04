let assert = require("assert");
let BillWithSettings = require("../settings-bill");

describe('The bill with settings factory function', function(){
    let settingsBill = BillWithSettings();
    it('should be able to set call cost', function(){
       
        settingsBill.setCallCost(1.85);
        assert.equal(1.85, settingsBill.getCallCost());

        let settingsBill2 = BillWithSettings();

        settingsBill2.setCallCost(2.75);
        assert.equal(2.75, settingsBill2.getCallCost());
        

    });

    it('should be able to set sms cost', function(){
        let settingsBill = BillWithSettings();

        settingsBill.setSmsCost(0.85);
        assert.equal(0.85, settingsBill.getSmsCost());

        let settingsBill2 = BillWithSettings();

        settingsBill2.setSmsCost(0.75);
        assert.equal(0.75, settingsBill2.getSmsCost());
        

    });

    it('should be able to set sms and call cost', function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.75 )
        settingsBill.setSmsCost(0.85);
        assert.equal(0.85, settingsBill.getSmsCost());
        assert.equal(2.75, settingsBill.getCallCost());

        let settingsBill2 = BillWithSettings();

        settingsBill2.setCallCost(1.75 )
        settingsBill2.setSmsCost(0.65);

        assert.equal(0.65, settingsBill2.getSmsCost());
        assert.equal(1.75, settingsBill2.getCallCost());

        

    }); 

    it('should be able to set the warning level', function(){
        let settingsBill = BillWithSettings();

        settingsBill.setWarningLevel(20);

        assert.equal(20, settingsBill.getWarningLevel());       

    }); 

    it('should be able to set the critical level', function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCriticalLevel(30);

        assert.equal(30, settingsBill.getCriticalLevel());       

    }); 

    it('should be able to set the warning and critical level', function(){
        let settingsBill = BillWithSettings();

        settingsBill.setWarningLevel(15);
        settingsBill.setCriticalLevel(25);

        assert.equal(15, settingsBill.getWarningLevel());
        assert.equal(25, settingsBill.getCriticalLevel());       

    }); 


    describe("use values", function() {
        it("should be able to use the call cost set", function() {
           
                let settingsBill = BillWithSettings();
        
                settingsBill.setCriticalLevel(10)
                settingsBill.setCallCost(2.25);
                settingsBill.setSmsCost(0.85);

                settingsBill.makeCall();
                settingsBill.makeCall();
                settingsBill.makeCall();

                assert.equal(6.75, settingsBill.getTotalCost());
                assert.equal(6.75, settingsBill.getTotalCallCost());
                assert.equal(  0.00, settingsBill.getTotalSmsCost());
           

        });

        it("should be able to use the call cost set for 2 calls at 1.35 each", function() {
           
            
            let settingsBill = BillWithSettings();
    
            settingsBill.setCriticalLevel(10);
            settingsBill.setCallCost(1.35);
            settingsBill.setSmsCost(0.85);

            settingsBill.makeCall();
            settingsBill.makeCall();
            

            assert.equal(2.70, settingsBill.getTotalCost());
            assert.equal(2.70, settingsBill.getTotalCallCost());
            assert.equal( 0.00, settingsBill.getTotalSmsCost());
       

    });

    it("should be able to send 2 smses at 0.85 each & make 1 call at 1.35", function() {
           
            
        let settingsBill = BillWithSettings();

        settingsBill.setCriticalLevel(10);
        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);

        settingsBill.sendSms();
        settingsBill.makeCall();
        settingsBill.sendSms();
        

        assert.equal(3.05, settingsBill.getTotalCost());
        assert.equal(1.35, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());
   

});

    });

   describe("warning and critical level", function(){

    it("it should return a class name of 'warning' if warning level is reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);
        
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        
        assert.equal("warning", settingsBill.totalClassName());
    });

    it("it should return a class name of 'critical' if critical level had been reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);
        
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        
        assert.equal("danger", settingsBill.totalClassName());
    });

    it("it should should stop the Total call cost from increasing when critical level had been reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setCriticalLevel(10);
        
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        
        assert.equal("danger", settingsBill.totalClassName());
        assert.equal(10, settingsBill.getTotalCallCost());
    });

    it("it should allow the total increase after reaching the critical level & then upping the crirical level", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost(0.85);
        settingsBill.setWarningLevel(8);
        settingsBill.setCriticalLevel(10);
        
        
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        
        
        assert.equal("danger", settingsBill.totalClassName());
        assert.equal(10, settingsBill.getTotalCallCost());

        settingsBill.setCriticalLevel(20);

        assert.equal("warning", settingsBill.totalClassName());
        settingsBill.makeCall();
        settingsBill.makeCall();
        assert.equal(15, settingsBill.getTotalCallCost());

    });

   });
    
});