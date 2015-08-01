var GitHubApp = angular.module('GitHubApp', ['angularUtils.directives.dirPagination', 'angularLoadingBar']);

function GitHubDataController($scope, $http, $element){
	
	<!-- Define initial Views Statuses -->		
	$scope.mainView = true;		
	$scope.subpageView = false;
	$scope.avatarHovered = false;
	$scope.prevView = 'angularContributors';
	$scope.activeView = 'angularContributors';
				
	<!-- Set defulat Angular Contributors Order By User Angular Contributions  -->
	$scope.predicate = 'angularContributions';
	<!-- Set defulat Angular Contributors in Reverse Order  -->
	$scope.reverse = true;
	
	<!-- Set start Pagination Angular Contributors Main Page on 1  -->
	$scope.currentPage = 1;
	<!-- Set start Angular Contributors quantity on one page to 50 -->
	$scope.pageSize = 50;
		
	<!-- GitHub Token to get more than 60 requests  -->
	gitAccessToken = '464f46ec0c15b101035d1fd624a5773d0fea41ac';
	
	<!-- Array to store Unique Angular Repositories Contributors -->			
	$scope.uniqueContributors = [];
	
	<!-- Array to store Angular Repositories Contributions -->
	$scope.userAngularContributions = [{}];
	
	<!-- Object to store Angular Templates -->
	$scope.templates =
    {
    	'angularContributors' :'/App/Views/angularContributors.html',
      	'showUserDetails' : '/App/Views/showUserDetails.html',
      	'showRepoInfo' : '/App/Views/showRepoInfo.html',
      	'angularRepos' : '/App/Views/angularRepos.html',
      	'angularInfo' : '/App/Views/angularInfo.html'
	};
      
    <!-- Object to store Angular Templates help Parts -->
	$scope.templateParts =
    {
    	'header' : '/App/Views/Parts/header.html',
    	'pageBottom' : '/App/Views/Parts/pageBottom.html',
    	'footer' : '/App/Views/Parts/footer.html',
    	'sectionHeader' : '/App/Views/Parts/sectionHeader.html'   	
    };
    
    <!-- Object to store Pages View -->
	$scope.pages =
    {
    	'About' :'/App/Pages/About.html',
    	'Contact' : '/App/Pages/Contact.html' 
    	
    };
	
	init = function() {
		<!-- Start with getting info about Angular Organization -->
		$http.get("https://api.github.com/orgs/angular?client_secret="+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data) {
			$scope.userData = data;
			var repos_url = data.repos_url;
			<!-- Start Function to get Repositories Connected to Angular Organization -->
			loadRepos(repos_url);
		});
	} 
	
	<!-- Init data loading -->
	init();            		
	
	<!-- Function to get Repositories connected to Angular Organization -->	
	var loadRepos = function (repos_url) {
		$http.get(repos_url+'?per_page=100&client_secret='+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data) {
			$scope.repoData = data;
			angular.forEach($scope.repoData, function(item, index) {
				contributors_url = item.contributors_url;
				loadRepoContributors(contributors_url);
			});										
		});
	};				
	
	<!-- Function to get Angular connected Repositories Contributors -->	
	var loadRepoContributors = function (cont_url) {
		var i = 0;
		$http.get(cont_url+'?per_page=100&client_secret='+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data, response) {
			$scope.allContributors = data;					
			angular.forEach($scope.allContributors, function(item, i) {
				if($scope.userAngularContributions[item.login] != null) {
					$scope.userAngularContributions[item.login] += 1;
				} else {
					$scope.userAngularContributions[item.login] = 1;
				}					
				contributor_login = item.login;
				loadUserInfo(contributor_login);
			});
		});
	};
	
	<!-- Function to get Angular connected Repositories Contributors Infos -->
	var loadUserInfo = function (cont_login) {
		$scope.userNotFound = false;
		$scope.loaded = false;
		$http.get("https://api.github.com/users/"+cont_login+'?client_secret='+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data) {
			user_login = data.login;
			if(!containsObject(user_login, $scope.uniqueContributors) && data.login!=''){
				data['angularContributions']=$scope.userAngularContributions[data.login];
				$scope.uniqueContributors.push(data);
			}
		});
	}
    
	<!-- Function to get User Info -->
	$scope.showUserInfo = function (login) {
		$http.get("https://api.github.com/users/"+login+"/repos?per_page=100&client_secret="+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data) {
			$scope.userRepos = data;
			$scope.reposGeted = data.length > 0;
			$http.get("https://api.github.com/users/"+login+"?client_secret="+gitAccessToken, {headers: {'Content-type': 'application/json'}})
			.success(function (data) {
				$scope.userInfo = data;	
				$scope.userLogin = data.login;
				$('.dir-paginate').attr('pagination-id',$scope.userLogin);
				data['angularContributions']=$scope.userAngularContributions[data.login];
				$scope.prevView = $scope.activeView;
				$scope.activeView = 'showUsersDetails';
				$scope.subpageView = false;							
			});
		});
	};
	
	<!-- Function to get Repository Info -->
	$scope.showRepoInfo = function (url) {
		$http.get(url+"?client_secret="+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data) {
			$scope.repoInfo = data;
			//$scope.repoInfoGeted = data.length > 0;	
			var contributors_url = data.contributors_url; 
			$http.get(contributors_url+'?per_page=100&client_secret='+gitAccessToken, {headers: {'Content-type': 'application/json'}})
			.success(function (data) {  
				$scope.repoContributors = data;
				$scope.prevView = $scope.activeView;
				$scope.activeView = 'showRepoInfo';
				$scope.subpageView = false;
			});			
		});
	};
	
	<!-- Function to get Angular Repositories -->
	$scope.showAngularRepositories = function () {
		$http.get("https://api.github.com/orgs/angular/repos?per_page=100&client_secret="+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data) {
			$scope.angularRepos = data;
			$scope.prevView = $scope.activeView;
			$scope.activeView = 'angularRepos';
			$scope.subpageView = false;
		});
	};
	
	<!-- Function to get Infos About Angular Organization -->
	$scope.showAngularOrganizationInfo = function () {
		$http.get("https://api.github.com/orgs/angular?client_secret="+gitAccessToken, {headers: {'Content-type': 'application/json'}})
		.success(function (data) {
			$scope.angularOrganizationInfo = data;
			$scope.prevView = $scope.activeView;
			$scope.activeView = 'angularInfo';
			$scope.subpageView = false;			
		});
	};
	
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
	
	$scope.setView = function(view) {
		if($scope.activeView != $scope.prevView){
			$scope.activeView = view;
		}else{
			$scope.activeView = 'angularContributors';			
		};
		$scope.subpageView = false;
	};
	$scope.setPage = function(page) {
		$scope.subpageView = true;
		$scope.activeView = page;
	};
	$scope.reloadPage = function() {
		location.reload();
	};	
};


function PaginationController($scope) {
}

GitHubApp.controller('GitHubDataController', GitHubDataController);
GitHubApp.controller('PaginationController', PaginationController);