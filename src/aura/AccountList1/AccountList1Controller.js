({
	doInit : function( component, event, helper ) {
		helper.onInit( component, event, helper ); 
	},
    getSelectedAccount : function( component, event, helper ){
        var selectedAccount = event.getParam("selectedRows")[0];
        console.log('Account: '+JSON.stringify( selectedAccount ) );
        component.set("v.recordId", selectedAccount.Id );
    },
    openRecord : function( component, event, helper ){
        debugger;
        var action = event.getParam('action');
        var row = event.getParam('row');
        var lookupId;
        switch (action.name) {
            case 'view_account':
                lookupId = row.Id;
                break;
            case 'view_owner':
                lookupId = row.OwnerId;
                break;
            case 'view_createdby':
                lookupId = row.CreatedById;
                break;
            default:
                lookupId = row.Id;
                break;
        }
        
        if( lookupId ){
            var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
                "recordId": lookupId,
            });
            navEvt.fire();
        }
    }
})