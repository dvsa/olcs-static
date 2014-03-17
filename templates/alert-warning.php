<?php
	$pageTitle = "Alerts";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="overlay"></div>
		<div class="alert__wrapper">
			<div class="alert--warning">
				<h3>Alert header</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
				<div class="actions">
					<input class="button--warning" type="submit" value="Delete">
					<input class="button--secondary" type="submit" value="Cancel">
				</div><!-- end actions -->
			</div>
		</div>

		<div class="page-wrapper">
			<?php include 'includes/global-breadcrumbs.php'; ?>

			<div id="main" role="main" tabindex="-1" class="main">

				<?php include 'includes/page-header.php';  ?>
				<div class="content--primary">
					<div class="article">
						<p>Services should use clear, easy to read type, with consistent styles and a clear hierarchy of information.</p>
						<p>GOV.UK uses the typeface New Transport, cut especially for government use. This typeface is embedded in the GOV.UK CSS and is served to browsers via a WOFF file (or an EOT file for Internet Explorer 8). The font is hinted to display well on all browsers. Older browsers do not receive the typeface.</p>
						<p><a href="" class="button--primary--large">Launch alert</a></p>
					</div>
				</div>

			</div><!-- end main -->

		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
