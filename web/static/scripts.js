$(document).ready(function() {
    $('#chatbot-header').click(function() {
        $('#chatbot-body').slideToggle();
    });

    $('#chatbot-send-btn').click(function() {
        sendMessage();
    });

    $('#chatbot-input').keypress(function(event) {
        if (event.keyCode === 13) {
            sendMessage();
        }
    });

    $('#pdf-upload-btn').click(function() {
        $('#pdf-file-input').click();
    });

    $('#pdf-file-input').change(function() {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('pdf', file);

        $.ajax({
            url: '/upload',
            method: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: function(response) {
                alert(response.response);
            },
            error: function(error) {
                console.error("Error from server:", error);
                alert('Error uploading the PDF.');
            }
        });
    });

    function sendMessage() {
        var userInput = $('#chatbot-input').val();
        if (userInput.trim() === '') {
            return;
        }

        $('#chatbot-messages').append('<div class="chat-message user-message"><b>You:</b> ' + userInput + '</div>');
        $('#chatbot-input').val('');

        $.ajax({
            url: '/chat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ message: userInput }),
            success: function(response) {
                $('#chatbot-messages').append('<div class="chat-message bot-message"><b>Bot:</b> ' + response.response + '</div>');
                $('#chatbot-body').scrollTop($('#chatbot-body')[0].scrollHeight);
            },
            error: function(error) {
                console.error("Error from server:", error);
                $('#chatbot-messages').append('<div class="chat-message bot-message"><b>Bot:</b> Error processing your request.</div>');
            }
        });
    }
});
