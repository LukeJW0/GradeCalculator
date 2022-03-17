$(document).ready(function () {

    var localStorage = window.localStorage;

    $('#resetbutton').on('click', function () {
        localStorage.clear();
    });

    $('.yearselect').children().eq(0).prop('selected', true).trigger('change');
    
    $('.inputpercent').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $(this).blur();
        }
    });

    var UWPtsArr = [null, null, null, null];
    var WPtsArr = [null, null, null, null];
    var classesArr = [null, null, null, null];
    var UWYearPtsArr = [null, null, null, null];
    var WYearPtsArr = [null, null, null, null];
    var YearClassesArr = [null, null, null, null];

    var selectedYear = 'One';
    var selectedYearInt = 1;

    var GradesArr = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
    var WeightsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var selectedTerm = 'one';
    var selectedTermInt = 1;

    buttonSelected(selectedTerm);

    var uwgpainfo = $('#uwgpainfo');
    var wgpainfo = $('#wgpainfo');
    var uwfullyrgpainfo = $('#uwfullyrgpainfo');
    var wfullyrgpainfo = $('#wfullyrgpainfo');
    var uwcumulativegpainfo = $('#uwcumulativegpainfo');
    var wcumulativegpainfo = $('#wcumulativegpainfo');

    $('.gradeselect, .weightselect').on('change', function () {
        var cumulativeGPA = 0.0;
        var cumulativeWGPA = 0.0;
        var cumulativeGPAPoints = 0.0;
        var cumulativeWGPAPoints = 0.0;
        var cumulativeClasses = 0.0;
        var fullyearGPAPoints = 0.0;
        var fullyearWGPAPoints = 0.0;
        var fullyearClasses = 0.0;

        var totalGPAPoints = 0.0;
        var totalWGPAPoints = 0.0;
        var classesEntered = 0.0;
        var currentGPA = 0.0;
        var currentWGPA = 0.0;

        var nullCount = 0;

        $('.term' + selectedTerm).each(function () {
            var gradeWeight = ".t" + selectedTerm + $(this).attr('name') + 'weight';
            if ($(this).val() != "null") {
                if ($(this).val() == '0.0') {
                    if ($(gradeWeight).find(':selected').text() == "PSEO") {
                        classesEntered += 0.5;
                    } else {
                        classesEntered += 1.0;
                    }
                } else {
                    var hour = 0;
                    if ($(this).attr('name') == 'hourone') {
                        hour = 1;
                    } else if ($(this).attr('name') == 'hourtwo') {
                        hour = 2;
                    } else if ($(this).attr('name') == 'hourthree') {
                        hour = 3;
                    } else if ($(this).attr('name') == 'hourfour') {
                        hour = 4;
                    }
                    var index = ((selectedTermInt - 1) * 4 + hour) - 1;
                    if ($(gradeWeight).find(':selected').text() == "PSEO") {
                        totalGPAPoints += parseFloat($(this).val()) / 2;
                        totalWGPAPoints += parseFloat($(this).val()) / 2;
                        totalWGPAPoints += parseFloat($(gradeWeight).val()) / 2;
                        classesEntered += 0.5;
                        GradesArr[index] = (parseFloat($(this).val()) / 2).toString();
                        WeightsArr[index] = $(gradeWeight).find(':selected').index();
                        localStorage.setItem('year' + selectedYear + 'GradesArr', JSON.stringify(GradesArr));
                        localStorage.setItem('year' + selectedYear + 'WeightsArr', JSON.stringify(WeightsArr));
                    } else {
                        totalGPAPoints += parseFloat($(this).val());
                        totalWGPAPoints += parseFloat($(this).val());
                        totalWGPAPoints += parseFloat($(gradeWeight).val());
                        classesEntered += 1.0;
                        GradesArr[index] = $(this).val();
                        WeightsArr[index] = $(gradeWeight).find(':selected').index();
                        localStorage.setItem('year' + selectedYear + 'GradesArr', JSON.stringify(GradesArr));
                        localStorage.setItem('year' + selectedYear + 'WeightsArr', JSON.stringify(WeightsArr));
                    }
                }
            } else {
                nullCount += 1;
                if ($(this).attr('name') == 'hourone') {
                    hour = 1;
                } else if ($(this).attr('name') == 'hourtwo') {
                    hour = 2;
                } else if ($(this).attr('name') == 'hourthree') {
                    hour = 3;
                } else if ($(this).attr('name') == 'hourfour') {
                    hour = 4;
                }
                index = ((selectedTermInt - 1) * 4 + hour) - 1;
                GradesArr[index] = $(this).val();
                WeightsArr[index] = $(gradeWeight).find(':selected').index();
                localStorage.setItem('year' + selectedYear + 'GradesArr', JSON.stringify(GradesArr));
                localStorage.setItem('year' + selectedYear + 'WeightsArr', JSON.stringify(WeightsArr));
            }
        });
        
        var valsArr = [0.0, 0.5, 1.0, 0.5];
        for (let i = 0; i < 16; i++) {
            if (GradesArr[i] != "null") {
                fullyearGPAPoints += parseFloat(GradesArr[i]);
                fullyearWGPAPoints += parseFloat(GradesArr[i]);
                fullyearWGPAPoints += valsArr[WeightsArr[i]];
                if (WeightsArr[i] == 3) {
                    fullyearClasses += 0.5;
                } else {
                    fullyearClasses += 1.0;
                }
            }
        }
        var currentFullYearGPA;
        var currentFullYearWGPA;
        if (fullyearClasses > 0) {
            UWYearPtsArr[selectedYearInt - 1] = fullyearGPAPoints;
            WYearPtsArr[selectedYearInt - 1] = fullyearWGPAPoints;
            YearClassesArr[selectedYearInt - 1] = fullyearClasses;
            currentFullYearGPA = fullyearGPAPoints / fullyearClasses;
            currentFullYearWGPA = fullyearWGPAPoints / fullyearClasses;
        } else {
            UWYearPtsArr[selectedYearInt - 1] = null;
            WYearPtsArr[selectedYearInt - 1] = null;
            YearClassesArr[selectedYearInt - 1] = null;
            currentFullYearGPA = 0;
            currentFullYearWGPA = 0;
        }

        for (let i = 0; i < 4; i++) {
            if (UWYearPtsArr[i] != null) {
                cumulativeGPAPoints += UWYearPtsArr[i];
                cumulativeWGPAPoints += WYearPtsArr[i];
                cumulativeClasses += YearClassesArr[i];
            }
        }

        cumulativeGPA = cumulativeGPAPoints / cumulativeClasses;
        cumulativeWGPA = cumulativeWGPAPoints / cumulativeClasses;

        if (nullCount == 4) {
            UWPtsArr[selectedTermInt - 1] = null;
            WPtsArr[selectedTermInt - 1] = null;
            $('#uwgpa').text("Unweighted GPA: " + (0.00).toFixed(2));
            $('#uwgpa').append(uwgpainfo);
            $('#wgpa').text("Weighted GPA: " + (0.00).toFixed(2));
            $('#wgpa').append(wgpainfo);

            if (fullyearClasses == 0) {
                $('#fullyeargpa').text("Full Year Unweighted GPA: " + (0.00).toFixed(2));
                $('#fullyeargpa').append(uwfullyrgpainfo);
                $('#fullyearwgpa').text("Full Year Weighted GPA: " + (0.00).toFixed(2));
                $('#fullyearwgpa').append(wfullyrgpainfo);
                
                if (cumulativeClasses == 0) {
                    $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (0.00).toFixed(2));
                    $('#cumulativegpa').append(uwcumulativegpainfo);
                    $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (0.00).toFixed(2));
                    $('#cumulativewgpa').append(wcumulativegpainfo);
                    return;
                }

                $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (cumulativeGPA).toFixed(2));
                $('#cumulativegpa').append(uwcumulativegpainfo);
                $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (cumulativeWGPA).toFixed(2));
                $('#cumulativewgpa').append(wcumulativegpainfo);
                return;
            }

            $('#fullyeargpa').text("Full Year Unweighted GPA: " + (currentFullYearGPA).toFixed(2));
            $('#fullyeargpa').append(uwfullyrgpainfo);
            $('#fullyearwgpa').text("Full Year Weighted GPA: " + (currentFullYearWGPA).toFixed(2));
            $('#fullyearwgpa').append(wfullyrgpainfo);
            
            $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (cumulativeGPA).toFixed(2));
            $('#cumulativegpa').append(uwcumulativegpainfo);
            $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (cumulativeWGPA).toFixed(2));
            $('#cumulativewgpa').append(wcumulativegpainfo);
            return;
        }

        UWPtsArr[selectedTermInt - 1] = totalGPAPoints;
        WPtsArr[selectedTermInt - 1] = totalWGPAPoints;
        classesArr[selectedTermInt - 1] = classesEntered;
        
        currentGPA = totalGPAPoints / classesEntered;
        currentWGPA = totalWGPAPoints / classesEntered;

        $('#uwgpa').text("Unweighted GPA: " + (currentGPA).toFixed(2));
        $('#uwgpa').append(uwgpainfo);
        $('#wgpa').text("Weighted GPA: " + (currentWGPA).toFixed(2));
        $('#wgpa').append(wgpainfo);

        $('#fullyeargpa').text("Full Year Unweighted GPA: " + (currentFullYearGPA).toFixed(2));
        $('#fullyeargpa').append(uwfullyrgpainfo);
        $('#fullyearwgpa').text("Full Year Weighted GPA: " + (currentFullYearWGPA).toFixed(2));
        $('#fullyearwgpa').append(wfullyrgpainfo);

        $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (cumulativeGPA).toFixed(2));
        $('#cumulativegpa').append(uwcumulativegpainfo);
        $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (cumulativeWGPA).toFixed(2));
        $('#cumulativewgpa').append(wcumulativegpainfo);
    });

    function load() {
        for (let i = 0; i < 4; i++) {
            var tempSelectedYear = 'One';
            if (i == 1) {
                tempSelectedYear = 'Two';
            } else if (i == 2) {
                tempSelectedYear = 'Three';
            } else if (i == 3) {
                tempSelectedYear = 'Four';
            }
            var fullyearGPAPoints = 0.0;
            var fullyearWGPAPoints = 0.0;
            var fullyearClasses = 0.0;
            var loadGradesArr = JSON.parse(localStorage.getItem('year' + tempSelectedYear + 'GradesArr'));
            var loadWeightsArr = JSON.parse(localStorage.getItem('year' + tempSelectedYear + 'WeightsArr'));
            var valsArr = [0.0, 0.5, 1.0, 0.5];
            for (let j = 0; j < 16; j++) {
                if (loadGradesArr[j] != "null") {
                    fullyearGPAPoints += parseFloat(loadGradesArr[j]);
                    fullyearWGPAPoints += parseFloat(loadGradesArr[j]);
                    fullyearWGPAPoints += valsArr[loadWeightsArr[j]];
                    if (loadWeightsArr[j] == 3) {
                        fullyearClasses += 0.5;
                    } else {
                        fullyearClasses += 1.0;
                    }
                }
            }
            var currentFullYearGPA;
            var currentFullYearWGPA;
            if (fullyearClasses > 0) {
                UWYearPtsArr[i] = fullyearGPAPoints;
                WYearPtsArr[i] = fullyearWGPAPoints;
                YearClassesArr[i] = fullyearClasses;
                currentFullYearGPA = fullyearGPAPoints / fullyearClasses;
                currentFullYearWGPA = fullyearWGPAPoints / fullyearClasses;
            }
        }
    }

    setYear();
    function setYear() {
        if (localStorage.getItem('year' + selectedYear + 'GradesArr') != null && selectedYearInt == 1) {
            GradesArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'GradesArr'));
            WeightsArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'WeightsArr'));
        } else if (localStorage.getItem('year' + selectedYear + 'GradesArr') != null && selectedYearInt == 2) {
            GradesArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'GradesArr'));
            WeightsArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'WeightsArr'));
        } else if (localStorage.getItem('year' + selectedYear + 'GradesArr') != null && selectedYearInt == 3) {
            GradesArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'GradesArr'));
            WeightsArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'WeightsArr'));
        } else if (localStorage.getItem('year' + selectedYear + 'GradesArr') != null && selectedYearInt == 4) {
            GradesArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'GradesArr'));
            WeightsArr = JSON.parse(localStorage.getItem('year' + selectedYear + 'WeightsArr'));
        } else {
            GradesArr = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
            WeightsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }

        $('.gradeselect').each(function () {
            if ($(this).attr('class').split(' ')[1] == 'termone') {
                selectedTerm = 'one';
                selectedTermInt = 1;
            } else if ($(this).attr('class').split(' ')[1] == 'termtwo') {
                selectedTerm = 'two';
                selectedTermInt = 2;
            } else if ($(this).attr('class').split(' ')[1] == 'termthree') {
                selectedTerm = 'three';
                selectedTermInt = 3;
            } else if ($(this).attr('class').split(' ')[1] == 'termfour') {
                selectedTerm = 'four';
                selectedTermInt = 4;
            }
    
            var hour = 0;
            if ($(this).attr('name') == 'hourone') {
                hour = 1;
            } else if ($(this).attr('name') == 'hourtwo') {
                hour = 2;
            } else if ($(this).attr('name') == 'hourthree') {
                hour = 3;
            } else if ($(this).attr('name') == 'hourfour') {
                hour = 4;
            }
            var index = ((selectedTermInt - 1) * 4 + hour) - 1;
    
            var thisWeightSelect = "t" + selectedTerm + $(this).attr('name') + 'weight';
            
            $('.' + thisWeightSelect).children().eq(WeightsArr[index]).prop('selected', true);
            $(this).val(GradesArr[index]);

            if (hour == 4) {
                $('.gradeselect').trigger('change');
            }
            selectedTerm = 'one';
            selectedTermInt = 1;
        });
        $('.gradeselect').trigger('change');
        $('#termonebutton').trigger('click');
    }

    $('.yearselect').on('change', function() {
        if ($(this).find(':selected').attr('name') == 'yone') {
            selectedYearInt = 1;
            selectedYear = 'One';
        } else if ($(this).find(':selected').attr('name') == 'ytwo') {
            selectedYearInt = 2;
            selectedYear = 'Two';
        } else if ($(this).find(':selected').attr('name') == 'ythree') {
            selectedYearInt = 3;
            selectedYear = 'Three';
        } else if ($(this).find(':selected').attr('name') == 'yfour') {
            selectedYearInt = 4;
            selectedYear = 'Four';
        }
        setYear();
    });

    $('.termbutton').on('click', function () {
        if ($(this).attr('id').includes('one')) {
            selectedTerm = 'one';
            selectedTermInt = 1;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termoneclasses').css('display', 'block');
        } else if ($(this).attr('id').includes('two')) {
            selectedTerm = 'two';
            selectedTermInt = 2;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termtwoclasses').css('display', 'block');
        } else if ($(this).attr('id').includes('three')) {
            selectedTerm = 'three';
            selectedTermInt = 3;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termthreeclasses').css('display', 'block');
        } else if ($(this).attr('id').includes('four')) {
            selectedTerm = 'four';
            selectedTermInt = 4;
            buttonSelected(selectedTerm);
            $('.term').css('display', 'none');
            $('.termfourclasses').css('display', 'block');
        }
        if (UWPtsArr[selectedTermInt - 1] == null) {
            $('#uwgpa').text("Unweighted GPA: " + (0.00).toFixed(2));
            $('#uwgpa').append(uwgpainfo);
            $('#wgpa').text("Weighted GPA: " + (0.00).toFixed(2));
            $('#wgpa').append(wgpainfo);
            return;
        }
        $('#uwgpa').text("Unweighted GPA: " + (UWPtsArr[selectedTermInt - 1] / classesArr[selectedTermInt - 1]).toFixed(2));
        $('#uwgpa').append(uwgpainfo);
        $('#wgpa').text("Weighted GPA: " + (WPtsArr[selectedTermInt - 1] / classesArr[selectedTermInt - 1]).toFixed(2));
        $('#wgpa').append(wgpainfo);
    });

    function buttonSelected(term) {
        $('.termbutton').removeClass('button-enabled');
        $('#term' + term + 'button').addClass('button-enabled');
    }

    $('body').on('click', '.infobutton', function () {
        $('.infotext').text($(this).val());
        $('.infopopup').css('display', 'block');
    });

    $('.inforesponse').on('click', function () {
        $('.infopopup').css('display', 'none');
    });

    $('.infobuttonheader').on('click', function () {
        $('.startpopup').css('display', 'block');
    });

    $('.startresponse').on('click', function () {
        $('.startpopup').css('display', 'none');
    });

    $('.inputpercent').on('focusout', function () {
        calculateNewScore();
    });
    $('.gradeareaselect').on('change', function () {
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
            if (isNaN(newGrade)) {
                $('#newscorelabel').text("Your Grade Will Be: --%");
                return;
            }
            $('#newscorelabel').text("Your Grade Will Be: " + newGrade.toFixed(2) + "%");
        } else if ($('.gradeareaselect').val() == "Formative") {
            var newGrade = (parseFloat($('#summativeweight').val()) * ((summativePoints) / (summativeTotalPoints))) + (parseFloat($('#formativeweight').val()) * ((formativePoints + newPoints) / (formativeTotalPoints + newTotalPoints)));
            if (isNaN(newGrade)) {
                $('#newscorelabel').text("Your Grade Will Be: --%");
                return;
            }
            $('#newscorelabel').text("Your Grade Will Be: " + newGrade.toFixed(2) + "%");
        }
    }
});
