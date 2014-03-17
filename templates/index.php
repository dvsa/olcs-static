<?php
	$pageTitle = "OLCS Styleguide";
	$pageSubtitle = "Use the following pages as a guide for HTML, CSS & Javascript";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="page-wrapper">
			<ol class="global-breadcrumbs">
				<li class="global-breadcrumbs__item current">Home</li>
			</ol><!-- end global-breadcrumbs -->

			<div id="main" role="main" tabindex="-1" class="main">

				<?php include 'includes/page-header.php';  ?>
				<div class="content--primary">
					<div class="article">
					<?php
					$directoryToRead = __DIR__;
					$filesToIgnore = array(
						'index.php',
						'.',
						'..',
						'.DS_Store',
						'includes',
						'modal-form-include.php',
						'modal-table-include.php'
					);
					$index = array();
					if ($handle = opendir($directoryToRead)) {
						while (false !== ($entry = readdir($handle))) {
							if (!in_array($entry, $filesToIgnore)) {
								list($key, $restOfFileName) = explode('-', $entry, 2);
								$key = ucwords($key);
								if (!isset($index[$key])) {
									$index[$key] = array();
								}
								$index[$key][] = array('fileName' => $entry, 'label' => ucwords(str_replace('-', ' ', strtok($restOfFileName, '.'))));
							}
					   }
					} ?>

						<ul>
							<?php
							foreach ($index as $folder => $files) {
							if (count($files) < 2) { ?>
								<li><a href="<?php echo $files[0]['fileName']; ?>"><?php echo $folder . ' ' . $files[0]['label']; ?></a></li>
								<?php } else { foreach ($files as $file) { ?>
								<li><a href="<?php echo $file['fileName']; ?>"><?php echo $folder; ?> <?php echo $file['label']; ?></a></li><?php }?>
								<?php } } ?>
						</ul>
						<h3>Requirements</h3>
						<ul>
							<li><a href="">Sass 3.3</a></li>
							<li><a href="">Node.js</a></li>
						</ul>
						<h3>HTML</h3>
						<p>Use the BEM styntax, use as few wrapper elements as possible. Dont use </p>
					</div>
				</div><!-- end content- primary -->

			</div><!-- end main -->

		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
