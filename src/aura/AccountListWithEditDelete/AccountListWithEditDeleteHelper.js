({
	onInit : function( component, event, helper ) {
        debugger;
        var actions = [
            { label: 'Edit', name: 'edit_account' },
            { label: 'Delete', name: 'delete_account' }
        ];
        var columns = [
            {label: 'Account Name', type: 'button', typeAttributes:{ label:{fieldName:'Name'}, name: 'view_account', variant:'base', class:'customAction-truncate'} },
            {label: 'Account Number', fieldName: 'AccountNumber', type: 'text'},
            {label: 'Account Owner', type: 'button', typeAttributes:{ label:{fieldName:'OwnerName'}, name: 'view_owner', variant:'base', class:'customAction-truncate'} },
            {label: 'Account Source', fieldName: 'AccountSource', type: 'text'},
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', typeAttributes: { currencyCode: 'USD'}},
            {label: 'Type', fieldName: 'Type', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Created By', type: 'button', typeAttributes:{ label:{fieldName:'CreatedByName'}, name: 'view_createdby', variant:'base', class:'customAction-truncate'} },
        	{ type: 'action', typeAttributes: { rowActions: actions } }
        ];
        component.set("v.columns", columns);
    	this.getRecentAccounts( component, event, helper );
    }, 
    getRecentAccounts : function( component, event, helper ){
        var action = component.get("c.getRecentModifiedAccounts");
        action.setCallback( this, function( response ){
            var state = response.getState();
            if( state == "SUCCESS" ){
                var accounts = response.getReturnValue();
                accounts.forEach( function( account ){
            		account.OwnerName = account.Owner.Name;
                    account.CreatedByName = account.CreatedBy.Name;
                });
                component.set("v.accounts", accounts );
            }else if( state == "ERROR" ){
                
            }
        });
		$A.enqueueAction( action );
    },
    onDeleteAccount : function( component, event, helper ){
        var action = component.get("c.deleteAccounts");
        action.setParams({
            "accountIds" : [component.get("v.recordId")]
        });
        action.setCallback( this, function( response ){
            var state = response.getState();
            if( state == "SUCCESS" ){
                this.showToast( "Account \""+component.get("v.accountName")+"\" was deleted.", " ", "success");
                component.set("v.recordId", "" );
                component.set("v.accountName", "");
                this.closeModal( component, "deleteAccountModal" );
                this.getRecentAccounts( component, event, helper );
            }else if( state == "ERROR" ){
                console.log('Error : '+JSON.stringify( response.getError() ) );
                if( response.getError() && response.getError()[0] && response.getError()[0].pageErrors && response.getError()[0].pageErrors[0].message ){
                    this.showToast( response.getError()[0].pageErrors[0].message, " ", "error");
                }else{
	                this.showToast( "Unable to delete Account \""+component.get("v.accountName")+"\".", " ", "error");
                }
            }
        });
		$A.enqueueAction( action );
    },
    navigateToAccount : function( component, event, helper, recordId ){
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
        });
        navEvt.fire();
    },
    openEditRecordForm : function(  component, recordId, accountName ){
        component.set("v.recordId", recordId );
        component.set("v.accountName", accountName);
        component.set("v.showEditModal", true );
    },
    closeEditModal : function( component, event, helper ){
        component.set("v.recordId", "" );
        component.set("v.accountName", "");
        component.set("v.isNew", false);
        component.set("v.showEditModal", false );
        this.closeModal( component, "editAccountModal" );
    },
    openDeleteConfirmModal : function( component, accountId, accountName ){
        component.set("v.recordId", accountId );
        component.set("v.accountName", accountName);
        this.openModal( component, "deleteAccountModal" );
    },
    onCloseDeleteModal : function( component, event, helper ){
        component.set("v.recordId", "" );
        component.set("v.accountName", "");
        this.closeModal( component, "deleteAccountModal" );
    },
    openModal : function( component, modalId ){
        $A.util.addClass( component.find( modalId ), "slds-fade-in-open");
        $A.util.addClass( component.find( "slds-backdrop" ), "slds-backdrop_open");
    },
    closeModal : function( component, modalId ){
        $A.util.removeClass( component.find( modalId ), "slds-fade-in-open");
        $A.util.removeClass( component.find( "slds-backdrop" ), "slds-backdrop_open");
    },
    showToast : function( title, message, type ) {
        $A.get("e.force:showToast").setParams({
            "title": title,
            "message": message,
            "type" : type
        }).fire();
    },
})