CKEDITOR.config.toolbar = [
    ['Format', 'Bold', 'Italic', 'Underline', 'NumberedList', 'BulletedList']
] ;

let detailedDescription = document.getElementById('AboutExperienceStepForm_AboutExperienceStepForm_DetailedDescription');
if (detailedDescription) {
    CKEDITOR.replace(detailedDescription);
}

let describeBusiness = document.getElementById('AboutBusinessStepForm_AboutBusinessStepForm_DescribeBusiness');
if (describeBusiness) {
    CKEDITOR.replace(describeBusiness);
}



