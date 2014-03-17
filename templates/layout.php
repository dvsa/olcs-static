<?php
	$pageTitle = "Layout";
	$pageSubtitle = "A collection of standard layouts";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="page-wrapper">
			<?php include 'includes/global-breadcrumbs.php'; ?>
			<div id="main" role="main" tabindex="-1" class="main">
				<?php include 'includes/page-header.php';  ?>
				<div class="row"><!-- For example purpose only, do not use .row elements --> 
					<div class="content--secondary"></div><!-- end content- secondary -->
					<div class="content--primary"></div><!-- end content- primary -->
				</div>
				<div class="row"><!-- For example purpose only, do not use .row elements --> 
					<div class="content--primary"></div><!-- end content- primary -->
					<div class="content--secondary right-aligned"></div><!-- end content- secondary -->
				</div>
			</div><!-- end main -->
		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
