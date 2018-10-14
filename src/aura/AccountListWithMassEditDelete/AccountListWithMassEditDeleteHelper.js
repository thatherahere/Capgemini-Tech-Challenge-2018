({
	onInit : function( component, event, helper ) {
        debugger;
        var columns = [
            {label: 'Account Name', type: 'button', typeAttributes:{ label:{fieldName:'Name'}, name: 'view_account', variant:'base', class:'customAction-truncate'} },
            {label: 'Account Number', fieldName: 'AccountNumber', type: 'text'},
            {label: 'Account Owner', type: 'button', typeAttributes:{ label:{fieldName:'OwnerName'}, name: 'view_owner', variant:'base', class:'customAction-truncate'} },
            {label: 'Account Source', fieldName: 'AccountSource', type: 'text'},
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency', typeAttributes: { currencyCode: 'USD'}},
            {label: 'Type', fieldName: 'Type', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Created By', type: 'button', typeAttributes:{ label:{fieldName:'CreatedByName'}, name: 'view_createdby', variant:'base', class:'customAction-truncate'} },
        ];
        component.set("v.columns", columns);
    	this.getRecentAccounts( component, event, helper );
    }, 
    getRecentAccounts : function( component, event, helper ){
        var action = component.get("c.getInitData");
        action.setCallback( this, function( response ){
            var state = response.getState();
            if( state == "SUCCESS" ){
            	var results = response.getReturnValue();
            	var accounts = results.accounts;
                accounts.forEach( function( account ){
            		account.OwnerName = account.Owner.Name;
                    account.CreatedByName = account.CreatedBy.Name;
                });
                component.set( "v.accounts", accounts );
            	component.set( "v.accountSourceOptions", results.accountSourceOptions );
            }else if( state == "ERROR" ){
                
            }
        });
		$A.enqueueAction( action );
    },
    onDeleteAccount : function( component, event, helper ){
            debugger;
        var selectedAccountIds = component.get("v.accountIds");
        var action = component.get("c.deleteAccounts");
        action.setParams({
            "accountIds" : selectedAccountIds
        });
        action.setCallback( this, function( response ){
            var state = response.getState();
            if( state == "SUCCESS" ){
                this.showToast( "Account(s) were deleted.", " ", "success");
                component.set("v.accountIds", []);
        		component.find("accountTable").set('v.selectedRows', []);
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
   	onSaveSourceUpdate : function( component, event, helper ){
        var accountSource = component.find("accountSource").get("v.value");
       	var selectedAccountIds = component.get("v.accountIds");
        var action = component.get("c.UpdateAccountsSource");
        action.setParams({
            "accountIds" : selectedAccountIds,
            "accountSource" : accountSource
        });
        action.setCallback( this, function( response ){
            var state = response.getState();
            if( state == "SUCCESS" ){
                component.set("v.accountIds", []);
                component.find("accountTable").set('v.selectedRows', []);
                this.showToast( "Account(s) were saved.", " ", "success");
                this.closeModal( component, "editAccountSourceModal" );
                this.getRecentAccounts( component, event, helper );
            }else if( state == "ERROR" ){
                console.log('Error : '+JSON.stringify( response.getError() ) );
                if( response.getError() && response.getError()[0] && response.getError()[0].pageErrors && response.getError()[0].pageErrors[0].message ){
                    this.showToast( response.getError()[0].pageErrors[0].message, " ", "error");
                }else{
	                this.showToast( "Unable to update Account Source.", " ", "error");
                }
            }
        });
        $A.enqueueAction( action );
    },
    navigateToRecord : function( component, event, helper, recordId ){
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
        });
        navEvt.fire();
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