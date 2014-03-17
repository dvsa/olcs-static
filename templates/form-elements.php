<?php
	$pageTitle = "Form elements";
	$pageSubtitle = "All the form elements you could possible need";
?>
		<?php include 'includes/global-header.php'; ?>

		<div class="page-wrapper">
			<?php include 'includes/global-breadcrumbs.php'; ?>

			<div id="main" role="main" tabindex="-1" class="main">

				<?php include 'includes/page-header.php';  ?>

				<div class="content--secondary">
					<?php 
						$verticalNavigationItems = array('Postal address', 'Personal information', 'About you');
						include 'includes/vertical-navigation.php';
					?>
				</div><!-- end content- secondary -->

				<div class="content--primary">
					<form> 
						
						<fieldset id="postal-address">
							<legend>Postal address</legend>
							<div class="field">
								<label for="address__line-one">Address line 1</label>
			        			<input id="address__line-one" type="text" class="address__line long" />
							</div>
							<div class="field">
								<label for="address__line-two">Address line 2</label>
			        			<input id="address__line-two" type="text" class="address__line long" />
							</div>
							<div class="field">
								<label for="town">Town/City</label>
			        			<input id="town" type="text" class="town long" />
							</div>
							<div class="field">
								<label for="postcode">Postcode</label>
			        			<input id="postcode" type="text" class="postcode short" />
							</div>
							<fieldset>
								<legend class="legend--small">Postcode</legend>
								<div class="field--inline">
									<label for="postcode-search" class="visually-hidden">Postcode</label>
				        			<input id="postcode-search" type="text" class="postcode-search short" />
								</div>
								<div class="field--inline">
									<input class="button--primary" type="submit" value="Search">
								</div>
							</fieldset>
						</fieldset><!-- end fieldset- postal-address -->

						<fieldset id="personal-information">
							<legend>Personal information</legend>
							<div class="field">
								<label for="title">Title</label>
									<select id="title">
									<option value="Please select">Mr.</option>
								</select>
							</div>
							<div class="field">
								<label for="first-name">First name</label>
			        			<input id="first-name" type="text" class="first-name long" />
							</div>
							<div class="field">
								<label for="last-name">Last name</label>
			        			<input id="last-name" type="text" class="last-name long" />
							</div>
							<fieldset>
								<legend class="legend--small">Date of birth</legend>
								<div class="field--inline">
									<label for="day" class="visually-hidden">Day</label>
									<select id="day">
										<option value="Day">Day</option>
									</select>
								</div>
								<div class="field--inline">
									<label for="month" class="visually-hidden">Month</label>
									<select id="month">
										<option value="Month">Month</option>
									</select>
								</div>
								<div class="field--inline">
									<label for="year" class="visually-hidden">Year</label>
									<select id="year">
										<option value="Year">Year</option>
									</select>
								</div>
							</fieldset>	
							<fieldset>
								<legend class="legend--small">Gender</legend>
								<div class="field--inline">
									<label><input type="radio" name="gender" checked>Male</label>
								</div>
								<div class="field--inline">
									<label><input type="radio" name="gender">Female</label>
								</div>
							</fieldset>
						</fieldset><!-- end fieldset- personal-information -->

						<fieldset id="about-you">
							<legend>About you</legend>
							<fieldset>
								<legend class="legend--small">I am interested in</legend>
								<div class="field--list">
									<label for="jobs"><input type="checkbox" id="jobs">Job offers</label>
								</div>
								<div class="field--list">
									<label for="networking"><input type="checkbox" id="networking">Networking</label>
								</div>
								<div class="field--list">
									<label for="business"><input type="checkbox" id="business">Business opportunities</label>
								</div>
							</fieldset>
							<div class="field">
								<label for="biography">Biography</label>
								<textarea id="biography" class="biography extra-long" placeholder="Enter text here"></textarea>
								<span class="field__hint">Write a few short words about yourself</span>
							</div>
						</fieldset><!-- end fieldset- about-you -->

						<div class="actions">
							<input class="button--secondary" type="submit" value="Previous">
							<input class="button--primary" type="submit" value="Next">
							<input class="button--warning" type="submit" value="Delete">
						</div><!-- end actions -->

					</form>

				</div><!-- end content- primary -->

			</div><!-- end main -->

		</div><!-- end page-wrapper -->

<?php include 'includes/global-footer.php'; ?>
		
