<?php
	$pageTitle = "OLCS Typography";
	$pageSubtitle = "Everything you need to create make great looking typography";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="page-wrapper">
			<?php include 'includes/global-breadcrumbs.php'; ?>

			<div id="main" role="main" tabindex="-1" class="main">

				<?php include 'includes/page-header.php';  ?>
				<div class="content--secondary">
					<?php 
						$verticalNavigationItems = array('The GovUK typeface', 'Using New Transport', 'Colour contrast', 'Type size', 'Services and information');
						include 'includes/vertical-navigation.php';
					?>
				</div><!-- end content- secondary -->
				<div class="content--primary">
					<div class="article">
						<p>Services should use clear, easy to read type, with consistent styles and a clear hierarchy of information.</p>
						<h2 id="the-govuk-typeface">The GOV.UK typeface</h2>
						<p>GOV.UK uses the typeface New Transport, cut especially for government use. This typeface is embedded in the GOV.UK CSS and is served to browsers via a WOFF file (or an EOT file for Internet Explorer 8). The font is hinted to display well on all browsers. Older browsers do not receive the typeface.</p>
						<p>We currently use two weights of New Transport: Light and Bold. Italics should not be used. The number of different type sizes on a page should be kept to the minimum, and only one typeface/font should be used on each website.</p>
						<h2>A big heading about typography</h2>
						<h3 id="using-new-transport">Using New Transport</h3>
						<p>New Transport is not licenced for use outside of the GOV.UK domain. When your service goes live you'll be given access to the typeface.</p>
						<p>If the service uses numbers in columns or tables, you should change these to use the tabular number version of New Transport. This replaces the standard numbers with new versions that have a fixed width. The main noticable difference is a base on the character 1. GDS has used this on the <a href="/performance">Performance Platform</a> and Trade Tariff.</p>
						<h3 id="colour-contrast">Colour contrast</h4>
						<p>Text must have enough contrast against the background colour to be readable. This should be tested to conform with our <a href="/service-manual/user-centered-design/accessibility.html">Accessibility requirements</a>. Generally we use type in #0B0C0C against a white or light grey background. Links should be blue and underlined - see <a href="/service-manual/user-centered-design/resources/colour-palettes.html">Colour palettes</a>.</p>
						<h3 id="type-size">Type size</h5>
						<p>Type should be large enough to be easily read. This is generally larger than many current websites: 36px for headlines, 19px for body text. This can be included using default styles in scss from the <a href="/service-manual/user-centered-design/resources/sass-repositories.html">Frontend Toolkit</a>. These include line height spacing that works across browsers.</p>
				        <h2 id="services-and-information">Services and information</h2>
				        <ul>
							<li><a href="">Accessibility standard</a></li>
							<li><a href="">Accessibility testing</a></li>
							<li><a href="">Accessibility statements and policies</a></li>
							<li><a href="">Assistive technologies</a></li>
							<li><a href="">Accessible formats</a></li>
							<li><a href="">Accessible content</a></li>
							<li><a href="">Further reading</a></li>
						</ul>
					</div>
				</div>

			</div><!-- end main -->

		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
