<?php
	$pageTitle = "Modal table js";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="overlay"></div>
		<div class="modal__wrapper">
			<div class="modal">
				<a href="" class="modal__close">Close</a>
				<?php include 'modal-table-include.php'; ?>
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
						<p><a href="" class="button--primary--large">Launch modal</a></p>
					</div>
				</div><!-- end content- primary -->

			</div><!-- end main -->

		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
