<?php
	$pageTitle = "Navigation elements";
	$pageSubtitle = "A collection of standardised navigation elements";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="page-wrapper">
			<?php include 'includes/global-breadcrumbs.php'; ?>
			<div id="main" role="main" tabindex="-1" class="main">
				<!-- pagination -->
				<!-- vertical navigation -->
				<!-- progress -->

				<?php include 'includes/page-header.php';  ?>
			
				<h3>Horizontal navigation</h3>
				<ul class="horizontal-navigation" role="navigation" >
					<li class="horizontal-navigation__item"><a href="">Item one</a></li>
					<li class="horizontal-navigation__item">Item two</li>
					<li class="horizontal-navigation__item"><a href="">Item three</a></li>
					<li class="horizontal-navigation__item"><a href="">Item four</a></li>
					<li class="horizontal-navigation__item"><a href="" class="disabled">Item five</a></li>
					<li class="horizontal-navigation__item"><a href="">Item six</a></li>
					<li class="horizontal-navigation__item disabled">Item seven</li>
					<li class="horizontal-navigation__item"><a href="">Item eight</a></li>
				</ul><!-- end horizontal- navigation -->

				<h3>Vertical navigation</h3>
				<div class="content--secondary">
					<?php 
						$verticalNavigationItems = array('Postal address', 'Personal information', 'About you');
						include 'includes/vertical-navigation.php';
					?>
				</div>

				<div class="row"><!-- For example purpose only, do not use .row elements --> 
					<h3>Pagination</h3>
					<ul class="pagination" role="navigation">
						<li class="pagination__item"><a href=""rel="prev">Previous</a></li>
					    <li class="pagination__item"><a href="">1</a></li>
					    <li class="pagination__item"><a href="">2</a></li>
					    <li class="pagination__item">3</li>
					    <li class="pagination__item"><a href="" rel="next">4</a></li>
					    <li class="pagination__item"><a href="">5</a></li>
					    <li class="pagination__item">...</li>
					    <li class="pagination__item"><a href="">14</a></li>
					    <li class="pagination__item"><a href=""rel="prev">Next</a></li>
					</ul>
				</div>

			</div><!-- end main -->
		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
