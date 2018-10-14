/**
* The AccountListController is in use with AccountList1, AccountListWithEditDelete & AccountListWithMassEditDelete
*   ligthning components. 
*
* @author  Govind Thathera
* @version 1.0
* @since   14/10/2018
*/

public class AccountListController {
	/*
	 * Get recently modified top 15 accounts.
	 * 
	 */
    @AuraEnabled
    public static list<Account> getRecentModifiedAccounts(){
        return [SELECT Id, Name, AccountNumber, OwnerId, Owner.Name, AccountSource,  
                AnnualRevenue, Type, CreatedById, CreatedBy.Name, Industry
                FROM Account 
                Order By LastModifiedDate desc 
                limit 15];
    }
    
    @AuraEnabled
    public static map<String, Object> getInitData(){
        map<String, Object> results = new map<String, Object>();
        list<String> accountSourceOptions = getPicklistValues( new Account(), 'AccountSource' );
        results.put( 'accountSourceOptions', accountSourceOptions);
        
        list<Account> lstAccount = new list<Account>( [SELECT Id, Name, AccountNumber, OwnerId, Owner.Name, AccountSource,  
                                                       AnnualRevenue, Type, CreatedById, CreatedBy.Name, Industry
                                                       FROM Account 
                                                       Order By LastModifiedDate desc 
                                                       limit 15] );
        results.put( 'accounts', lstAccount );
        return results;
    } 
    
    private static list<String> getPicklistValues( sObject sobj, String fieldName ){
        list<String> options = new list<String>();
        // Get sobject field map
        map<String, Schema.SObjectField> fieldMap = sobj.getSObjectType().getDescribe().fields.getMap();
        // Get the list of picklist values for this field.
        list<Schema.PicklistEntry> values = fieldMap.get( fieldName ).getDescribe().getPickListValues();
        // Add these values to the selectoption list.
        for (Schema.PicklistEntry option : values ) {
            options.add( option.getValue() );
        }
        system.debug('allOpts ---->' + options);
		options.sort();
        return options;
    }
    
    @AuraEnabled
    public static String UpdateAccountsSource( list<String> accountIds, String accountSource ){
        list<Account> lstAccount = new list<Account>();
        for( String accountId : accountIds ){
            lstAccount.add( new Account( id=accountId, AccountSource=accountSource ) );
        }
        update lstAccount;
        return 'success';
    }
    
    @AuraEnabled
    public static String deleteAccounts( list<String> accountIds){
        list<Account> lstAccount = new list<Account>();
        for( String accountId : accountIds ){
            lstAccount.add( new Account( id=accountId ) );
        }
        delete lstAccount;
        return 'success';
    }
}