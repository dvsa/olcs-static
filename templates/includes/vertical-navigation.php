<div class="vertical-navigation" role="navigation">
	<h4 class="vertical-navigation__title">Content</h4>
	<ol>
	<?php foreach($verticalNavigationItems as $item) { ?>
		<li class="vertical-navigation__item">
			<a href="#<?php echo strtolower(str_replace(' ', '-', $item)); ?>"><?php echo $item; ?></a>
		</li>
	<?php } ?>
	</ol>
</div><!-- end vertical-navigation -->

