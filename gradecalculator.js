$(document).ready(function () {

    var localStorage = window.localStorage;

    $('#resetbutton').on('click', function () {
        localStorage.clear();
    });

    var UWGPAArr = [null, null, null, null];
    var WGPAArr = [null, null, null, null];
    var UWYearArr = [null, null, null, null];
    var WYearArr = [null, null, null, null];
    var classesArr = [null, null, null, null];

    var selectedYear = 'One';
    var selectedYearInt = 1;

    var GradesArr = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
    var yearTwoGradesArr = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
    var yearThreeGradesArr = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
    var yearFourGradesArr = ["null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null", "null"];
    var WeightsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var yearTwoWeightsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var yearThreeWeightsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var yearFourWeightsArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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
        var cumulativeYears = 0.0;
        var fullyearGPA = 0.0;
        var fullyearWGPA = 0.0;
        var fullyearGPAPoints = 0.0;
        var fullyearWGPAPoints = 0.0;
        var fullyearTerms = 0.0;
        var fullyearClasses = 0.0;

        var totalGPAPoints = 0.0;
        var totalWGPAPoints = 0.0;
        var classesEntered = 0.0;

        var nullCount = 0;

        $('.term' + selectedTerm).each(function () {
            var gradeWeight = ".t" + selectedTerm + $(this).attr('name') + 'weight';
            if ($(this).val() != "null") {
                if ($(this).val() == '0.0') {
                    // if pseo only add 0.5
                    classesEntered += 1.0;
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
                        // alert('3');
                    } else {
                        totalGPAPoints += parseFloat($(this).val());
                        totalWGPAPoints += parseFloat($(this).val());
                        totalWGPAPoints += parseFloat($(gradeWeight).val());
                        classesEntered += 1.0;
                        GradesArr[index] = $(this).val();
                        WeightsArr[index] = $(gradeWeight).find(':selected').index();
                        localStorage.setItem('year' + selectedYear + 'GradesArr', JSON.stringify(GradesArr));
                        localStorage.setItem('year' + selectedYear + 'WeightsArr', JSON.stringify(WeightsArr));
                        // alert('4');
                    }
                    // alert('5');
                    // localStorage.setItem("term" + selectedTerm + $(this).attr('name'), $(this).val());
                    // // alert('6');
                    // // alert($(gradeWeight).find(':selected').text());
                    // localStorage.setItem("t" + selectedTerm + $(this).attr('name') + 'weight', $(gradeWeight).find(':selected').text());
                    // alert('7');
                    // alert(localStorage.getItem("t" + selectedTerm + $(this).attr('name') + 'weight'));
                    // alert($(gradeWeight).find(':selected').text());
                    // alert(GradesArr);
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
        // alert(nullCount);
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
        if (fullyearClasses > 0) {
            UWYearArr[selectedYearInt - 1] = fullyearGPAPoints / fullyearClasses;
            WYearArr[selectedYearInt - 1] = fullyearWGPAPoints / fullyearClasses;
        }

        if (nullCount == 4) {
            UWGPAArr[selectedTermInt - 1] = null;
            WGPAArr[selectedTermInt - 1] = null;
            $('#uwgpa').text("Unweighted GPA: " + (0.00).toFixed(2));
            $('#uwgpa').append(uwgpainfo);
            $('#wgpa').text("Weighted GPA: " + (0.00).toFixed(2));
            $('#wgpa').append(wgpainfo);
            // for (let i = 0; i < 4; i++) {
            //     if (UWGPAArr[i] != null) {
            //         fullyearGPAPoints += UWGPAArr[i];
            //         fullyearWGPAPoints += WGPAArr[i];
            //         fullyearTerms += 1.0;
            //     }
            // }

            if (fullyearClasses == 0) {
                $('#fullyeargpa').text("Full Year Unweighted GPA: " + (0.00).toFixed(2));
                $('#fullyeargpa').append(uwfullyrgpainfo);
                $('#fullyearwgpa').text("Full Year Weighted GPA: " + (0.00).toFixed(2));
                $('#fullyearwgpa').append(wfullyrgpainfo);
                return;
            }

            // fullyearGPA = fullyearGPAPoints / fullyearTerms;
            // fullyearWGPA = fullyearWGPAPoints / fullyearTerms;

            $('#fullyeargpa').text("Full Year Unweighted GPA: " + (UWYearArr[selectedYearInt - 1]).toFixed(2));
            $('#fullyeargpa').append(uwfullyrgpainfo);
            $('#fullyearwgpa').text("Full Year Weighted GPA: " + (WYearArr[selectedYearInt - 1]).toFixed(2));
            $('#fullyearwgpa').append(wfullyrgpainfo);
            return;
        }

        UWGPAArr[selectedTermInt - 1] = totalGPAPoints / classesEntered;
        WGPAArr[selectedTermInt - 1] = totalWGPAPoints / classesEntered;

        for (let i = 0; i < 4; i++) {
            if (UWYearArr[i] != null) {
                cumulativeGPAPoints += UWYearArr[i];
                cumulativeWGPAPoints += WYearArr[i];
                cumulativeYears += 1.0;
            }
        }

        cumulativeGPA = cumulativeGPAPoints / cumulativeYears;
        cumulativeWGPA = cumulativeWGPAPoints / cumulativeYears;

        // UWYearArr[selectedYearInt - 1] = fullyearGPAPoints / fullyearTerms;
        // WYearArr[selectedYearInt - 1] = fullyearWGPAPoints / fullyearTerms;

        // for (let i = 0; i < 4; i++) {
        //     if (UWCumArr[i] != null) {
        //         totalGPAPoints += UWGPAArr[i];
        //         fullyearWGPAPoints += WGPAArr[i];
        //         fullyearTerms += 1.0;
        //     }
        // }

        $('#uwgpa').text("Unweighted GPA: " + (UWGPAArr[selectedTermInt - 1]).toFixed(2));
        $('#uwgpa').append(uwgpainfo);
        $('#wgpa').text("Weighted GPA: " + (WGPAArr[selectedTermInt - 1]).toFixed(2));
        $('#wgpa').append(wgpainfo);

        $('#fullyeargpa').text("Full Year Unweighted GPA: " + (UWYearArr[selectedYearInt - 1]).toFixed(2));
        $('#fullyeargpa').append(uwfullyrgpainfo);
        $('#fullyearwgpa').text("Full Year Weighted GPA: " + (WYearArr[selectedYearInt - 1]).toFixed(2));
        $('#fullyearwgpa').append(wfullyrgpainfo);

        $('#cumulativegpa').text("Cumulative Unweighted GPA: " + (cumulativeGPA).toFixed(2));
        $('#cumulativegpa').append(uwcumulativegpainfo);
        $('#cumulativewgpa').text("Cumulative Weighted GPA: " + (cumulativeWGPA).toFixed(2));
        $('#cumulativewgpa').append(wcumulativegpainfo);
    });

    // $('.weightselect').each(function() {
    //     if ($(this).attr('class').split(' ')[1] == 'termoneweight') {
    //         selectedTerm = 'one';
    //         selectedTermInt = 1;
    //     } else if ($(this).attr('class').split(' ')[1] == 'termtwoweight') {
    //         selectedTerm = 'two';
    //         selectedTermInt = 2;
    //     } else if ($(this).attr('class').split(' ')[1] == 'termthreeweight') {
    //         selectedTerm = 'three';
    //         selectedTermInt = 3;
    //     } else if ($(this).attr('class').split(' ')[1] == 'termfourweight') {
    //         selectedTerm = 'four';
    //         selectedTermInt = 4;
    //     }
    //     var thisGrade = localStorage.getItem($(this).attr('class').split(' ')[2]);
    //     // alert($(this).attr('class').split(' ')[2]);
    //     if (thisGrade != null) {
    //         $(this).children().filter(function(){
    //             return $(this).text() == thisGrade;
    //         }).prop('selected', true);
    //         $(this).trigger('change');
    //     } 
    // });

    // loadGrades();
    // function loadGrades() {
    //     for (let i = 1; i < 4; i++) {
    //         $('.yearselect').children().eq(i).prop('selected', true);
    //         $('.yearselect').trigger('change');
    //     }
    //     $('.yearselect').children().eq(0).prop('selected', true);
    //     $('.yearselect').trigger('change');
    // }
    // function loadGrades() {
    //     // var allGrades = [JSON.parse(localStorage.getItem('yearOneGradesArr')), JSON.parse(localStorage.getItem('yearTwoGradesArr')), JSON.parse(localStorage.getItem('yearThreeGradesArr')), JSON.parse(localStorage.getItem('yearFourGradesArr'))];
    //     // var allWeights = [JSON.parse(localStorage.getItem('yearOneWeightsArr')), JSON.parse(localStorage.getItem('yearTwoWeightsArr')), JSON.parse(localStorage.getItem('yearThreeWeightsArr')), JSON.parse(localStorage.getItem('yearFourWeightsArr'))];
    //     var yearsArr = ['One', 'Two', 'Three', 'Four'];
    //     var valsArr = [0.0, 0.5, 1.0, 0.5];
    //     for (let j = 0; j < 4; j++) {
    //         var localfullyearClasses = 0.0;
    //         var localfullyearGPAPoints = 0.0;
    //         var localfullyearWGPAPoints = 0.0;
    //         // alert(j);
    //         let grades = JSON.parse(localStorage.getItem('year' + yearsArr[j] + 'GradesArr'));
    //         let weights = JSON.parse(localStorage.getItem('year' + yearsArr[j] + 'WeightsArr'));
    //         if (grades != null) {
    //             // alert('g');
    //             for (let i = 0; i < 16; i++) {
    //                 // alert(i);
    //                 if (grades[i] != "null") {
    //                     localfullyearGPAPoints += parseFloat(grades[i]);
    //                     localfullyearWGPAPoints += parseFloat(grades[i]);
    //                     localfullyearWGPAPoints += valsArr[weights[i]];
    //                     if (weights[i] == 3) {
    //                         localfullyearClasses += 0.5;
    //                     } else {
    //                         localfullyearClasses += 1.0;
    //                     }
    //                 }
    //             }
    //         }
    //         // alert('h');
    //         // alert(localfullyearClasses);
    //         // alert(localfullyearGPAPoints / localfullyearClasses);
    //         UWYearArr[j] = localfullyearGPAPoints / localfullyearClasses;
    //         WYearArr[j] = localfullyearWGPAPoints / localfullyearClasses;
    //         // alert('t');
    //     }
    //     setYear();
    // }

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
        // alert(selectedYear);
        // alert(GradesArr);
        // 
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
            // alert(GradesArr[index]);
    
            var thisWeightSelect = "t" + selectedTerm + $(this).attr('name') + 'weight';
            
            $('.' + thisWeightSelect).children().eq(WeightsArr[index]).prop('selected', true);
            $(this).val(GradesArr[index]);

            if (hour == 4) {
                $('.gradeselect').trigger('change');
            }
            selectedTerm = 'one';
            selectedTermInt = 1;
        });
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

    $('body').on('click', '.infobutton', function () {
        $('.infotext').text($(this).val());
        $('.infopopup').css('display', 'block');
    });

    $('.inforesponse').on('click', function () {
        $('.infopopup').css('display', 'none');
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
            $('#newscorelabel').text("Your Grade Will Be: " + newGrade.toFixed(2) + "%");
        } else if ($('.gradeareaselect').val() == "Formative") {
            var newGrade = (parseFloat($('#summativeweight').val()) * ((summativePoints) / (summativeTotalPoints))) + (parseFloat($('#formativeweight').val()) * ((formativePoints + newPoints) / (formativeTotalPoints + newTotalPoints)));
            $('#newscorelabel').text("Your Grade Will Be: " + newGrade.toFixed(2) + "%");
        }
    }
});
