$(document).ready(function() {

    function determineRoundWinner(player_choice, opponent_choice) {
        var roundWinner = '';
        
        switch (player_choice) {
            case '✊':
                if (opponent_choice == '✊') {
                    
                } else if (opponent_choice == '✋') {
                    roundWinner = 'opponent';
                } else if (opponent_choice == '✌️') {
                    roundWinner = 'player';
                } else {
                    alert('error');
                }
                break;
        
            case '✋':
                if (opponent_choice == '✊') {
                    roundWinner = 'player';
                } else if (opponent_choice == '✋') {
                    
                } else if (opponent_choice == '✌️') {
                    roundWinner = 'opponent';
                } else {
                    alert('error');
                }
                break

            case '✌️':
                if (opponent_choice == '✊') {
                    roundWinner = 'opponent';
                } else if (opponent_choice == '✋') {
                    roundWinner = 'player';
                } else if (opponent_choice == '✌️') {

                } else {
                    alert('error');
                }
                break

            default:
                alert('error');
                break;
        }

        return roundWinner;
    }

    function displayScoreNotification(person) {
        $(".score_notification_" + person + " span").html('+1').animate({
            fontSize: "100px",
            opacity: "0"
        }, 700, "linear", function() {
            $(this).empty().css({'font-size': '0px', 'opacity': '1'});
        });
    }

    function fillStar(person) {
        for (var i = 1; i <= eval(person + '_score'); i++) {
            $(".score_row_" + person + " img:nth-child(" + i + ")").attr('src', 'img/star_filled.png');
        }
    }

    function determineGameWinner(player_score, opponent_score) {
        var gameWinner = '';

        if (player_score >= rounds_to_win) {
            gameWinner = 'player';
        } else if (opponent_score >= rounds_to_win) {
            gameWinner = 'opponent';
        }
        return gameWinner;
    }

    function resetRound() {
        $("#object_chosen_player").html(waiting_icon);
        $("#object_chosen_opponent").html(waiting_icon);

        setTimeout(function() {
            computer_choice = choices[Math.floor(Math.random() * 3)];
            console.log(computer_choice);
            $("#object_chosen_opponent").html(choice_made_icon);

            $(".choices_column span").css('opacity', '1');
            $(".choices_column span").css('pointer-events', 'auto');
        }, 200);
    }


    var choices = ['✊', '✋', '✌️'];
    var waiting_icon = '⌛';
    var choice_made_icon = '✔️';

    var game_won_title = 'You won :)';
    var game_won_description = 'Congratulations, you won the "Rock, Paper, Scissors" !<br>You can now restart another game or go back to the homepage for more games.';
    var game_lost_title = 'You lost :(';
    var game_lost_description = 'Unfortunately, you lost the "Rock, Paper, Scissors"...<br>You can now restart another game or go back to the homepage for more games.';

    var rounds_to_win = 3;

    var player_name = 'You';
    var opponent_name = 'Computer';
    var player_score = 0;
    var opponent_score = 0;


    //Initialize UI
    //Icons
    for (let i = 0; i < choices.length; i++) {
        $(".choices_column span:nth-child(" + (i+1) + ")").html(choices[i]);
    }
    $("#object_chosen_player").html(waiting_icon);
    $("#object_chosen_opponent").html(waiting_icon);

    //Text
    $('#player_section .choice_made_column h3').html(player_name);
    $('#opponent_section .choice_made_column h3').html(opponent_name);

    //Stars
    for (let i = 1; i <= rounds_to_win; i++) {
        $(".score_row").append('<img src="img/star_outline.png" class="mr-1 ml-1" alt="">');
    }

    //Initialization by computer
    var computer_choice = choices[Math.floor(Math.random() * 3)];
    /* Cheat tool
    console.log(computer_choice);*/
    $("#object_chosen_opponent").html(choice_made_icon);

    $(".choices_column span").click(function(event) {
        player_choice = event.target.innerHTML;
        opponent_choice = computer_choice;

        //Removal of the ability to use choice buttons
        $(".choices_column span").css('pointer-events', 'none');
        $(".choices_column span").css('opacity', 0.3);

        //Display what the player and opponent chose
        $("#object_chosen_player").html(player_choice);
        $("#object_chosen_opponent").html(opponent_choice);

        //Determine winner of the round, update score and add a star for the winner
        roundWinner = determineRoundWinner(player_choice, opponent_choice);
        if (roundWinner) {
            eval(roundWinner + '_score++');
            displayScoreNotification(roundWinner);
            fillStar(roundWinner);
        }

        gameWinner = determineGameWinner(player_score, opponent_score);

        if (gameWinner == 'player') {
            $("#overlay #end_game_title").html(game_won_title).addClass('text-success');
            $("#overlay #end_game_description").html(game_won_description);
            $("#overlay").addClass('d-flex').removeClass('d-none');
        } else if (gameWinner == 'opponent') {
            $("#overlay #end_game_title").html(game_lost_title).addClass('text-danger');
            $("#overlay #end_game_description").html(game_lost_description);
            $("#overlay").addClass('d-flex').removeClass('d-none');
        }

        //Reload page if the user wants to restart
        $('#overlay #restart_button').click(function() {
            document.location.reload(true);
        });

        //Reset the round
        if (!gameWinner) {
            setTimeout(function() {
                resetRound();
            }, 3000);
        }

    });

});