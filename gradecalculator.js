$(document).ready(function() {
    var termOneGPA = null;
    var termOneWGPA = null;
    var termOneClasses = null;
    var termTwoGPA = null;
    var termTwoWGPA = null;
    var termTwoClasses = null;
    var termThreeGPA = null;
    var termThreeWGPA = null;
    var termThreeClasses = null;
    var termFourGPA = null;
    var termFourWGPA = null;
    var termFourClasses = null;

    var UWGPAArr = [null, null, null, null];
    var WGPAArr = [null, null, null, null];
    var classesArr = [null, null, null, null];

    
    
    var selectedTerm = 'one';
    var selectedTermInt = 1;

    buttonSelected(selectedTerm);

    var uwgpainfo = $('#uwgpainfo');
    var wgpainfo = $('#wgpainfo');
    var uwcumgpainfo = $('#uwcumgpainfo');
    var wcumgpainfo = $('#wcumgpainfo');

    $('.gradeselect, .weightselect').on('change', function() {
        var cumulativeGPA = 0.0;
        var cumulativeWGPA = 0.0;
        var cumulativeGPAPoints = 0.0;
        var cumulativeWGPAPoints = 0.0;
        var cumulativeTerms = 0.0;

        var totalGPAPoints = 0.0;
        var totalWGPAPoints = 0.0;
        var classesEntered = 0.0;

        var nullCount = 0;

        $('.term' + selectedTerm).each(function() {
            if ($(this).val() != "null") {
                if ($(this).val() == 0) {
                    classesEntered += 1.0;
                } else {
                    var gradeWeight = ".t" + selectedTerm + $(this).attr('name') + 'weight';
                    totalGPAPoints += parseFloat($(this).val());
                    totalWGPAPoints += parseFloat($(this).val());
                    totalWGPAPoints += parseFloat($(gradeWeight).val());
                    classesEntered += 1.0;
                }
            } else {
                nullCount += 1;
            }
        });

        if (nullCount == 4) {
            UWGPAArr[selectedTermInt - 1] = null;
            WGPAArr[selectedTermInt - 1] = null;
            $('#uwgpa').text("Unweighted GPA: " + (0.00).toFixed(2));
            $('#uwgpa').append(uwgpainfo);
            $('#wgpa').text("Weighted GPA: " + (0.00).toFixed(2));
            $('#wgpa').append(wgpainfo);
            for (let i = 0; i < 4; i++) {
                if (UWGPAArr[i] != null) {
                    cumulativeGPAPoints += UWGPAArr[i];
                    cumulativeWGPAPoints += WGPAArr[i];
                    cumulativeTerms += 1.0;
                }
            }

            if (cumulativeTerms == 0) {
                $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (0.00).toFixed(2));
                $('#cumulativegpa').append(uwcumgpainfo);
                $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (0.00).toFixed(2));
                $('#cumulativewgpa').append(wcumgpainfo);
                return;
            }
    
            cumulativeGPA = cumulativeGPAPoints / cumulativeTerms;
            cumulativeWGPA = cumulativeWGPAPoints / cumulativeTerms;

            $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (cumulativeGPA).toFixed(2));
            $('#cumulativegpa').append(uwcumgpainfo);
            $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (cumulativeWGPA).toFixed(2));
            $('#cumulativewgpa').append(wcumgpainfo);
            return;
        }

        UWGPAArr[selectedTermInt - 1] = totalGPAPoints / classesEntered;
        WGPAArr[selectedTermInt - 1] = totalWGPAPoints / classesEntered;

        for (let i = 0; i < 4; i++) {
            if (UWGPAArr[i] != null) {
                cumulativeGPAPoints += UWGPAArr[i];
                cumulativeWGPAPoints += WGPAArr[i];
                cumulativeTerms += 1.0;
            }
        }

        cumulativeGPA = cumulativeGPAPoints / cumulativeTerms;
        cumulativeWGPA = cumulativeWGPAPoints / cumulativeTerms;        

        $('#uwgpa').text("Unweighted GPA: " + (UWGPAArr[selectedTermInt - 1]).toFixed(2));
        $('#uwgpa').append(uwgpainfo);
        $('#wgpa').text("Weighted GPA: " + (WGPAArr[selectedTermInt - 1]).toFixed(2));
        $('#wgpa').append(wgpainfo);

        $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (cumulativeGPA).toFixed(2));
        $('#cumulativegpa').append(uwcumgpainfo);
        $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (cumulativeWGPA).toFixed(2));
        $('#cumulativewgpa').append(wcumgpainfo);
    });

    $('.termbutton').on('click', function() {
        if ($(this).attr('id').includes('one')) {
            selectedTerm = 'one';
            selectedTermInt = 1;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termoneclasses').css('display', 'block');
            // $('.gpatext').css('display', 'none');
            // $('.termonetext').css('display', 'block');
        } else if ($(this).attr('id').includes('two')) {
            selectedTerm = 'two';
            selectedTermInt = 2;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termtwoclasses').css('display', 'block');
            // $('.gpatext').css('display', 'none');
            // $('.termtwotext').css('display', 'block');
        } else if ($(this).attr('id').includes('three')) {
            selectedTerm = 'three';
            selectedTermInt = 3;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termthreeclasses').css('display', 'block');
            // $('.gpatext').css('display', 'none');
            // $('.termthreetext').css('display', 'block');
        } else if ($(this).attr('id').includes('four')) {
            selectedTerm = 'four';
            selectedTermInt = 4;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termfourclasses').css('display', 'block');
            // $('.gpatext').css('display', 'none');
            // $('.termfourtext').css('display', 'block');
        }
        if (UWGPAArr[selectedTermInt - 1] == null) {
            $('#uwgpa').text("Unweighted GPA: " + (0.00).toFixed(2));
            $('#uwgpa').append(uwgpainfo);
            $('#wgpa').text("Weighted GPA: " + (0.00).toFixed(2));
            $('#wgpa').append(wgpainfo);
            return;
        }
        $('#uwgpa').text("Unweighted GPA: " + (UWGPAArr[selectedTermInt - 1]).toFixed(2));
        $('#uwgpa').append(uwgpainfo);
        $('#wgpa').text("Weighted GPA: " + (WGPAArr[selectedTermInt - 1]).toFixed(2));
        $('#wgpa').append(wgpainfo);
    });

    function buttonSelected(term) {
        $('.termbutton').removeClass('button-enabled');
        $('#term' + term + 'button').addClass('button-enabled');
    }

    $('body').on('click','.infobutton', function() {
        $('.infotext').text($(this).val());
        $('.infopopup').css('display', 'block');
    });

    $('.inforesponse').on('click', function() {
        $('.infopopup').css('display', 'none');
    });

    $('.inputpercent').on('focusout', function() {
        calculateNewScore();
    });
    $('.gradeareaselect').on('change', function() {
        calculateNewScore();
    });

    function calculateNewScore() {
        var formativePoints = parseFloat($('#formativepercent').val().split('/')[0]);
        var formativeTotalPoints = parseFloat($('#formativepercent').val().split('/')[1]);
        var summativePoints = parseFloat($('#summativepercent').val().split('/')[0]);
        var summativeTotalPoints = parseFloat($('#summativepercent').val().split('/')[1]);
        var newPoints = parseFloat($('#scorebox').val().split('/')[0]);
        var newTotalPoints = parseFloat($('#scorebox').val().split('/')[1]);

        if ($('.gradeareaselect').val() == "Summative") {
            var newGrade = (parseFloat($('#summativeweight').val()) * ((summativePoints + newPoints) / (summativeTotalPoints + newTotalPoints))) + (parseFloat($('#formativeweight').val()) * ((formativePoints) / (formativeTotalPoints)));
            $('#newscorelabel').text("Your Grade Will Be: " + newGrade.toFixed(2) + "%");
        } else if ($('.gradeareaselect').val() == "Formative") {
            var newGrade = (parseFloat($('#summativeweight').val()) * ((summativePoints) / (summativeTotalPoints))) + (parseFloat($('#formativeweight').val()) * ((formativePoints + newPoints) / (formativeTotalPoints + newTotalPoints)));
            $('#newscorelabel').text("Your Grade Will Be: " + newGrade.toFixed(2) + "%");
        }
    }
});