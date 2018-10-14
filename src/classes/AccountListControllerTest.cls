/**
* The AccountListControllerTest is used to AccountListController class. 
*
* @author  Govind Thathera
* @version 1.0
* @since   14/10/2018
*/

@isTest
private class AccountListControllerTest {
	
	@TestSetup
	static void setupTestData(){

		list<Account> lstAccounts = new list<Account>();
		for(Integer i = 1; i <= 10; i++ ){
			lstAccounts.add( new Account( Name='Account '+i ) );
		}

		insert lstAccounts;
	}

	@isTest static void test_method_one() {
		Test.startTest();
			list<Account> lstAccount = AccountListController.getRecentModifiedAccounts();
			System.assert( lstAccount.size() == 10 );

			map<String, Object> results = AccountListController.getInitData();
			System.assert( ( (list<Account>) results.get('accounts') ).size()  == 10 );

			String response = AccountListController.UpdateAccountsSource( new list<String>{lstAccount[0].Id}, 'Other' );
			System.assert( response == 'success' );

			response = AccountListController.deleteAccounts( new list<String>{lstAccount[0].Id} );
			System.assert( response == 'success' );

		Test.stopTest();
	}
	
}