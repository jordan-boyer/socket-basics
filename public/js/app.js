var name = getQueryVariable("name") || "Anonymous";
var room = getQueryVariable("room");
var socket = io();

jQuery(".room-title").text(room);

socket.on("connect", function () {
	console.log("connected to socket.io server!");
	socket.emit("joinRoom", {
		name: name,
		room: room
	});
});

socket.on("message", function (message) {
	var momentTimestamp = moment.utc(message.timestamp);

	var $messages = jQuery(".messages");
	var $message = jQuery('<li class="list-group-item"></li>');


	$message.append("<p><strong>" + message.name + " " + momentTimestamp.local().format("h:mm a:") + "</strong></p>");
	$message.append("<p>" + message.text + "<p>");
	$messages.append($message);
});

var $form = jQuery("#message-form");

$form.on("submit", function(event) {
	event.preventDefault();

	var $message = $form.find("input[name=message]");

	socket.emit("message", {
		text: $message.val(),
		name: name
	});
	$message.val("");
});