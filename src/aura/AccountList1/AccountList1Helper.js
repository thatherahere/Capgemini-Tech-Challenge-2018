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
                console.log( JSON.stringify( accounts ) );
            }else if( state == "ERROR" ){
                
            }
        });
		$A.enqueueAction( action );
    }
})