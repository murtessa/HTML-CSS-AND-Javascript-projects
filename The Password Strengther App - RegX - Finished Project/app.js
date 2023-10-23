const strengther = document.querySelector(".strengther");
const passwordInput = document.querySelector('input[type="text"]');
const passwordCheck = document.querySelector(".password-check");

passwordInput.addEventListener("input", updateStrengther);

function updateStrengther() {
  const assessments = calculatePasswordStrength(passwordInput.value);

  let strength = 100;
  passwordCheck.innerHTML = "";

  assessments.forEach((assessment) => {
    if (assessment == null) return;

    strength -= assessment.stregnthLost;
    const pwdCheckEl = document.createElement("p");
    pwdCheckEl.innerHTML = assessment.pwdCheck;
    passwordCheck.appendChild(pwdCheckEl);
  });
  strengther.style.setProperty("--strength-amount", strength);
}

function calculatePasswordStrength(password) {
  const assessment = [];
  assessment.push(lengthAssessment(password));
  assessment.push(lowercaseAssessment(password));
  assessment.push(uppercaseAssessment(password));
  assessment.push(numberAssessment(password));
  assessment.push(specialCharaterAssessment(password));
  assessment.push(repeatCharactersAssessment(password));
  return assessment;
}

// Length Assessment Function
function lengthAssessment(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      pwdCheck: "Password is too short",
      stregnthLost: 40,
    };
  }

  if (length <= 10) {
    return {
      pwdCheck: "Password could be longer",
      stregnthLost: 15,
    };
  }
}

// Lowercase Character Assessment Function
function lowercaseAssessment(password) {
  return characterTypeAssessment(password, /[a-z]/g, "lowercase characters");
}

// Uppercase Character Assessment Function
function uppercaseAssessment(password) {
  return characterTypeAssessment(password, /[A-Z]/g, "uppercase characters");
}

// Number Assessment Function
function numberAssessment(password) {
  return characterTypeAssessment(password, /[0-9]/g, "numbers");
}

// Special Charater Assessment Function
function specialCharaterAssessment(password) {
  return characterTypeAssessment(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special characters"
  );
}

// Character Type Assessment Function
function characterTypeAssessment(password, regX, assessmentType) {
  const characterMatch = password.match(regX) || [];

  if (characterMatch.length === 0) {
    return {
      pwdCheck: `Password has no ${assessmentType}`,
      stregnthLost: 20,
    };
  }

  if (characterMatch.length <= 2) {
    return {
      pwdCheck: `Password must have more ${assessmentType}`,
      stregnthLost: 5,
    };
  }
}

function repeatCharactersAssessment(password) {
  const repeatCharMatch = password.match(/(.)\1/g) || [];

  if (repeatCharMatch.length > 0) {
    return {
      pwdCheck: "Password has repeat characters",
      stregnthLost: repeatCharMatch.length * 10,
    };
  }
}
