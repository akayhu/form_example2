var formObj = formObj || {};

formObj = (function(){

  var constructor = {
    name: false,
    address: false,
    phone: false,
    email: false,
    hasSomeoneElseDonation: false,
    hasSomeoneElseDonationChange: false
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
    donate: $("input[name=donate]"),
    someoneFirstName: $("input[name=someoneFirstName]"),
    someoneLastName: $("input[name=someoneLastName]"),
    someoneMessage: $("textarea[name=someoneMessage]")
  };

  var className = {
    mainName: $(".main_name"),
    mainAddress: $(".main_address"),
    mainPhone: $(".main_phone"),
    mainMail: $(".main_mail"),
    defaultMain: $(".default_main"),
    someoneName: $(".someone_name")
  };

  var _hasSomeoneElseDonationValue = function( num ){ // 檢查是否勾選其他人名義捐款 0 = yes, 1 = no
    var defaultMainDiv = className.defaultMain;
    if( num === 0 ) {
      uiVariety.blockDisplayShow( defaultMainDiv );
      constructor.hasSomeoneElseDonationChange = true;
    } else {
      uiVariety.blockDisplayHide( defaultMainDiv );
      constructor.hasSomeoneElseDonationChange = false;
      inputName.someoneFirstName.val('');
      inputName.someoneLastName.val('');
    }
  };

  var _checkValue = function( type, arr ){

    var hasFillIn = true;
    var emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    for( var i = 0; i < arr.length; i++ ){
      if( !arr[i] ){
        hasFillIn = false;
        return hasFillIn;
      } 
    }

    switch (type) {
      case 'address':
        if( arr[3].length < 5 ){
          hasFillIn = false;
          return hasFillIn;
        }
        break;
      case 'phone':
        if( arr[0].length < 7 ){
          hasFillIn = false;
          return hasFillIn;
        }
        break;
      case 'email':
        if( !emailReg.test( arr[0] ) ){
          hasFillIn = false;
          return hasFillIn;
        }
        break;
      default:
        break;
    }

    constructor[type] = true;
    return hasFillIn;

  };

  var _checkInput = function(){ // 檢查表單內容

    var data = {
      firstNameVal: inputName.firstName.val(), // 姓
      lastNameVal: inputName.lastName.val(), // 名
      addressOneVal: inputName.addressOne.val(), // 地址
      cityVal: inputName.city.val(), // 城市
      stateVal: inputName.state.val(), // 洲
      zipCodeVal: inputName.zipCode.val(), // 郵遞區號
      phoneVal: inputName.phone.val(), // 電話號碼
      emailVal: inputName.email.val(), // email
      donateVal: inputName.donate.val(), // 捐款金額
      someoneFirstNameVal: inputName.someoneFirstName.val(), // 其他捐款人名義姓
      someoneLastNameVal: inputName.someoneLastName.val(), // 其他捐款人名義名
      someoneMessage: inputName.someoneMessage.val() // 其他捐款人名義留言
    };

    var nameDiv = className.mainName, // 姓名區塊
        addressDiv = className.mainAddress, // 地址區塊
        phoneDiv = className.mainPhone, // 電話區塊
        emailDiv = className.mainMail, // email區塊
        hasSomeoneElseDonationDiv = className.someoneName; // 其他捐款人名義區塊

    var checkName = _checkValue( 'name', [data.firstNameVal, data.lastNameVal] );
    var checkAddress = _checkValue( 'address', [data.addressOneVal, data.cityVal, data.stateVal, data.zipCodeVal] );
    var checkPhone = _checkValue( 'phone', [data.phoneVal] );
    var checkEmail = _checkValue( 'email', [data.emailVal] );
    var checkHasSomeoneElseDonation = _checkValue( 'hasSomeoneElseDonation', [data.someoneFirstNameVal, data.someoneLastNameVal] );

    ( !checkName ) ? uiVariety.addErrorClass( nameDiv ) : uiVariety.removeErrorClass( nameDiv );
    ( !checkAddress ) ? uiVariety.addErrorClass( addressDiv ) : uiVariety.removeErrorClass( addressDiv );
    ( !checkPhone ) ? uiVariety.addErrorClass( phoneDiv ) : uiVariety.removeErrorClass( phoneDiv );
    ( !checkEmail ) ? uiVariety.addErrorClass( emailDiv ) : uiVariety.removeErrorClass( emailDiv );

    ( constructor.hasSomeoneElseDonationChange && !checkHasSomeoneElseDonation )
    ? uiVariety.addErrorClass( hasSomeoneElseDonationDiv )
    : uiVariety.removeErrorClass( hasSomeoneElseDonationDiv );

    if( constructor.name && constructor.address && constructor.phone && constructor.email ){
      // submit
      console.log( "送出", data );
    }

  };

  return {
    hasSomeoneElseDonationValue: _hasSomeoneElseDonationValue,
    checkInput: _checkInput
  };

}());


var uiVariety = uiVariety || {}

uiVariety = (function(){

  var _addErrorClass = function( divName ){ // 新增錯誤class
    divName.addClass("error");
  };

  var _removeErrorClass = function( divName ){ // 移除錯誤class
    divName.removeClass("error");
  };

  var _blockDisplayShow = function( divName ){ // 區塊顯示
    divName.show();
  };

  var _blockDisplayHide = function( divName ){ // 區塊隱藏
    divName.hide();
  };

  return {
    addErrorClass: _addErrorClass,
    removeErrorClass: _removeErrorClass,
    blockDisplayShow: _blockDisplayShow,
    blockDisplayHide: _blockDisplayHide
  };

}());

var myPage = myPage || {};

myPage = (function(){

  var init = function(){

    var submitBtn = $(".main_submit").find("button"),
    someone = $("input[name=field]"),
    defaultMainDiv = $(".default_main");

    someone.on( "change", function(){ // 是否用其他人名義捐款
      var self = $(this);
      var someoneValue = parseInt( self.val() ); // 字串轉數值
      formObj.hasSomeoneElseDonationValue( someoneValue );
    });

    submitBtn.on( "click", function(){ // submit送出
      formObj.checkInput();
    });

  };

  return {
    init: init
  };

}());

$(function(){

  myPage.init();

});