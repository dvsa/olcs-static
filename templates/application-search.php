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
				<h1>Search</h1>
				<h3 class="subtitle">Search for operator licences using any of the following fields:</h3>
			</div>
			<form> 
				<div class="field">
					<label for="licence">Licence number</label>
        			<input id="licence" type="text" class="licence medium" />
				</div>
				<div class="field">
					<label for="trading-name">Operator/trading name</label>
        			<input id="trading-name" type="text" class="trading-name long" />
				</div>
				<div class="field">
					<label for="postcode">Postcode</label>
        			<input id="postcode" type="text" class="postcode short" />
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
					<div class="field field--inline">
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
				<div class="actions">
					<input class="button--primary" type="submit" value="Search">
				</div>
			</form>
		</div><!-- .main-->

		<?php include 'includes/global-footer.php'; ?>

	</body>
</html>