//Spend is not lost
$(function(){
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
//Setting the spend
    $('#SpendAmount').click(function(){
     chrome.storage.sync.get(['total','limit'],function(budget){
         var newTotal = 0;
         if(budget.total){
             newTotal += parseInt(budget.total);
         }
         var amount = $("#amount").val();
         if(amount){
             newTotal += parseInt(amount);
         }
         //Updating
         chrome.storage.sync.set({"total": newTotal},function(){
             if(amount && newTotal >= budget.limit){
                 var notifOptions = {
                     type: "basic",
                     iconUrl: 'icon48.png',
                     title: 'Limit Reached',
                     message:"Ugh ! Looks like you've reached your limit"
                 };
                 chrome.notifications.create('limitNotif', notifOptions);
             }
         });
         $("#total").text(newTotal);
         $("#amount").val("");
     });
    });
});
