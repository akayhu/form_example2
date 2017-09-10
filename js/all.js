var formObj = formObj || {};

formObj = (function(){

  var constructor = {
    nameCheck: false,
    addressCheck: false,
    phoneCheck: false,
    emailCheck: false,
    someoneNameCheck: false,
    someoneChange: false,
  };

  var inputName = {
      firstName: $("input[name=firstName]"),
      lastName: $("input[name=lastName]"),
      addressOne: $("input[name=addressOne]"),
      city: $("input[name=city]"),
      state: $("select[name=state]"),
      zipCode: $("input[name=zipCode]"),
      phone: $("input[name=phone]"),
      email: $("input[name=email]"),
      someoneFirstName: $("input[name=someoneFirstName]"),
      someoneLastName: $("input[name=someoneLastName]")
    };

  var className = {
      mainName: $(".main_name"),
      mainAddress: $(".main_address"),
      mainPhone: $(".main_phone"),
      mainMail: $(".main_mail"),
      defaultMain: $(".default_main"),
      someoneName: $(".someone_name")
    };

  var _addErrorClass = function( divName ){ // 新增錯誤class
    divName.addClass("error");
  };

  var _removeErrorClass = function( divName ){ // 移除錯誤class
    divName.removeClass("error");
  };

  var _checkSomeoneVal = function( num ){ // 檢查是否勾選其他人名義捐款 0 = yes, 1 = no
    var defaultMainDiv = className.defaultMain;
    if( num === 0 ) {
      defaultMainDiv.show();
      constructor.someoneChange = true;
    } else {
      defaultMainDiv.hide();
      constructor.someoneChange = false;
    }
  };

  var _checkValue = function(){ // 檢查表單內容

    var firstNameVal = inputName.firstName.val(), // 姓
        lastNameVal = inputName.lastName.val(), // 名
        addressOneVal = inputName.addressOne.val(), // 地址
        cityVal = inputName.city.val(), // 城市
        stateVal = inputName.state.val(), // 洲
        zipCodeVal = inputName.zipCode.val(), // 郵遞區號
        phone = inputName.phone.val(), // 電話號碼
        email = inputName.email.val(), // email
        someoneFirstName = inputName.someoneFirstName.val(), // 其他捐款人名義姓
        someoneLastName = inputName.someoneLastName.val(); // 其他捐款人名義名

    var nameDiv = className.mainName, // 姓名區塊
        addressDiv = className.mainAddress, // 地址區塊
        phoneDiv = className.mainPhone, // 電話區塊
        emailDiv = className.mainMail, // email區塊
        someoneDiv = className.someoneName; // 其他捐款人名義區塊
        
    var emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if( !firstNameVal || !lastNameVal ){ // 姓名未輸入
      _addErrorClass( nameDiv );
    } else {
      _removeErrorClass( nameDiv );
      constructor.nameCheck = true;
    }

    if( !addressOneVal || !cityVal || !stateVal || !zipCodeVal || zipCodeVal.length < 5 ){ // 地址、城市、洲、郵遞區號未輸入或郵遞區號少於5碼
      _addErrorClass( addressDiv );
    } else {
      _removeErrorClass( addressDiv );
      constructor.addressCheck = true;
    }

    if( !phone || phone.length < 7 ){ // 電話未輸入或少於7碼
      _addErrorClass( phoneDiv )
    } else {
      _removeErrorClass( phoneDiv );
      constructor.phoneCheck = true;
    }

    if( !email || !emailReg.test( email ) ){ // email未輸入或正規表達式不符合
      _addErrorClass( emailDiv );
    } else {
      _removeErrorClass( emailDiv );
      constructor.emailCheck = true;
    }

    if( constructor.someoneChange ){ // 有勾選以其他捐款人在進行判斷
      if( !someoneFirstName || !someoneLastName ){ // 姓名未輸入
        _addErrorClass( someoneDiv );
      } else {
        _removeErrorClass( someoneDiv );
        constructor.someoneNameCheck = true;
      }
    }

    if( constructor.nameCheck && constructor.addressCheck && constructor.phoneCheck && constructor.emailCheck ){
      if( constructor.someone ){
        // submit
      } else {
        // submit
      }
    }

    console.log(
      {
        nameCheck: constructor.nameCheck,
        addressCheck: constructor.addressCheck,
        phoneCheck: constructor.phoneCheck,
        emailCheck: constructor.emailCheck,
        someoneNameCheck: constructor.someoneNameCheck
      }
    );

  };

  return {
    checkSomeoneVal: _checkSomeoneVal,
    checkValue: _checkValue
  };

}());


$(function(){

  var submitBtn = $(".main_submit").find("button"),
      someone = $("input[name=field]"),
      defaultMainDiv = $(".default_main");

  someone.on( "change", function(){ // 是否用其他人名義捐款
    var self = $(this);
    var someoneValue = parseInt( self.val() ); // 字串轉數值
    formObj.checkSomeoneVal( someoneValue );
  });

  submitBtn.on( "click", function(){ // submit送出
    formObj.checkValue();
  });

});