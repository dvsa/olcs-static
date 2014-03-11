<!DOCTYPE html>
<html>
	<head>
		<title>OLCS</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="../static/stylesheets/main.css">
	</head>
	<body>

		<?php include 'includes/global-header.php'; ?>

		<div class="main">
		    <ol class="global-breadcrumbs">
				<li class="global-breadcrumbs__item"><a href="/">Home</a></li>
				<li class="global-breadcrumbs__item current"><a href="">Search</a></li>
			</ol><!-- .global-breadcrumb -->
			<div class="page-header">
				<h1>OLCS Forms</h1>
				<h3 class="subtitle">All the form elements you could possible need:</h3>
			</div>
			<form> 
				<div class="validation-summary">
			        <h3>There was a problem submitting the form</h3>
			        <p>Please try the following:</p>
			        <ol class="validation-summary__list">
			        	<li class="validation-summary__item"><a href="#error1">Enter a day or city</a></li>
			         	<li class="validation-summary__item"><a href="#error2">Enter your date of birth</a></li>
			         	<li class="validation-summary__item"><a href="#error3">Select a gender</a></li>
			         	<li class="validation-summary__item"><a href="#error4">Tell us what you are interested in</a></li>
			         	<li class="validation-summary__item"><a href="#error5">Complete your biography</a></li>
			        </ol>
		        </div>
				<fieldset>
					<legend>Postal address</legend>
					<div class="field">
						<label for="address__line-one">Address line 1</label>
	        			<input id="address__line-one" type="text" class="address__line long" />
					</div>
					<div class="field">
						<label for="address__line-two">Address line 2</label>
	        			<input id="address__line-two" type="text" class="address__line long" />
					</div>
					<div class="validation-wrapper">
						<span class="validation-wrapper__message" id="error1">Please enter a town or city</span>
						<div class="field">
							<label for="town">Town/City</label>
		        			<input id="town" type="text" class="town long" />
						</div>
					</div>
					<div class="field">
						<label for="postcode">Postcode</label>
	        			<input id="postcode" type="text" class="postcode short" />
					</div>
				</fieldset>
				<fieldset>
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
					<div class="validation-wrapper">
						<span class="validation-wrapper__message" id="error2">Please enter your date of birth</span>
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
					</div>
					<fieldset>
						<legend class="legend--small">Gender</legend>
						<div class="field--inline">
							<label><input type="radio" name="gender" checked>Male</label>
						</div>
						<div class="field--inline">
							<label><input type="radio" name="gender">Female</label>
						</div>
					</fieldset>
					<div class="validation-wrapper">
						<span class="validation-wrapper__message" id="error3">Please select a gender</span>
						<fieldset class="fieldset">
							<legend class="legend--small">Gender</legend>
							<div class="field--inline">
								<label><input type="radio" name="gender" checked>Male</label>
							</div>
							<div class="field--inline">
								<label><input type="radio" name="gender">Female</label>
							</div>
						</fieldset>
					</div>
				</fieldset>
				<fieldset>
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
					<div class="validation-wrapper">
						<span class="validation-wrapper__message" id="error4">Please tell us what you are interested in</span>
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
					</div>
					<div class="field">
						<label for="biography">Biography</label>
						<textarea id="biography" class="biography extra-long" placeholder="Enter text here"></textarea>
						<span class="field__hint">Write a few short words about yourself</span>
					</div>
					<div class="validation-wrapper">
						<span class="validation-wrapper__message" id="error5">Please complete your biography</span>
						<div class="field">
							<label for="biography">Biography</label>
							<textarea id="biography" class="biography extra-long" placeholder="Enter text here"></textarea>
							<span class="field__hint">Write a few short words about yourself</span>
						</div>
					</div>
				</fieldset>
				<div class="actions">
					<input class="button--secondary" type="submit" value="Previous">
					<input class="button--primary" type="submit" value="Next">
					<input class="button--warning" type="submit" value="Delete">
				</div>
			</form>
		</div><!-- .main -->

		<?php include 'includes/global-footer.php'; ?>

	</body>
</html>