({
	doInit : function( component, event, helper ) {
		helper.onInit( component, event, helper ); 
	},
    handleRowActions : function( component, event, helper ){
        debugger;
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'view_account':
                helper.navigateToRecord( component, event, helper, row.Id );
                break;
            case 'view_owner':
                helper.navigateToRecord( component, event, helper, row.OwnerId );
                break;
            case 'view_createdby':
                helper.navigateToRecord( component, event, helper, row.CreatedById );
                break;
            default:
                break;
        }
    },
    handleRowSelection : function( component, event, helper ){
        var selectedRows = event.getParam('selectedRows');
        var selectAccountIds = [];
        if( selectedRows && selectedRows.length > 0 ){
	  		selectedRows.forEach( function( row ){
          		selectAccountIds.push( row.Id );   
            });
        }
        component.set("v.accountIds", selectAccountIds);
    },
    handleSourceUpdate : function( component, event, helper ){
        var selectAccountIds = component.get("v.accountIds");
        if( selectAccountIds && selectAccountIds.length > 0 ){
            component.set("v.selectSourceVal", "" );
            helper.openModal( component, "editAccountSourceModal" );
        }else{
            helper.showToast("Please select some accounts to update.", " ", "info");
        }
    },
    doSaveSourceUpdate : function( component, event, helper ){
        helper.onSaveSourceUpdate( component, event, helper );
    },
    handleDelete : function( component, event, helper ){
        var selectAccountIds = component.get("v.accountIds");
        if( selectAccountIds && selectAccountIds.length > 0 ){
            helper.openModal( component, "deleteAccountModal" );
        }else{
            helper.showToast("Please select some accounts to delete.", " ", "info");
        }
    },
    handleDeleteSelected : function( component, event, helper ){
        helper.onDeleteAccount( component, event, helper );
    },
    closeSourceUpdateModal : function( component, event, helper ){
        helper.closeModal( component, "editAccountSourceModal" );
    },
    closeDeleteModal : function( component, event, helper ){
        helper.closeModal( component, "deleteAccountModal" );
    }
})