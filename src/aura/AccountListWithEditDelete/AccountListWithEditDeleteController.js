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
                helper.navigateToAccount( component, event, helper, row.Id );
                break;
            case 'view_owner':
                helper.navigateToAccount( component, event, helper, row.OwnerId );
                break;
            case 'view_createdby':
                helper.navigateToAccount( component, event, helper, row.CreatedById );
                break;
            case 'edit_account':
                helper.openEditRecordForm( component, row.Id, row.Name );
                break;
            case 'delete_account':
                helper.openDeleteConfirmModal( component, row.Id, row.Name );
                break;
            default:
                break;
        }
    },
    createNewAccount : function( component, event, helper ){
        component.set("v.recordId", "");
        component.set("v.accountName", "New Account");
        component.set("v.isNew", true);
        helper.openModal( component, "editAccountModal" );
    },
    handleRecordLoad : function( component, event, helper ){
        helper.openModal( component, "editAccountModal" );
    },
    handleSubmit : function( component, event, helper ){
        console.log('record submitted.');
    },
    handleSuccess : function( component, event, helper ){
        helper.showToast( "Account \""+component.get("v.accountName")+"\" was saved.", " ", "success");
        helper.getRecentAccounts( component, event, helper );
        helper.closeEditModal( component, event, helper );
    },
    handleDelete : function( component, event, helper ){
        helper.onDeleteAccount( component, event, helper );
    },
    closeRecordEditForm : function( component, event, helper ){
        helper.closeEditModal( component, event, helper );
    },
    closeDeleteModal : function( component, event, helper ){
        helper.onCloseDeleteModal( component, event, helper );
    }
})