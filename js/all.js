var formObj = formObj || {};

formObj = (function(){

  // 預設各檢查區塊都是未檢查狀態
  var constructor = {
    name: false,
    address: false,
    phone: false,
    email: false,
    hasSomeoneElseDonation: false,
    hasSomeoneElseDonationChange: false
  };

  // 檢查是否勾選其他人名義捐款 0 = yes, 1 = no
  var _hasSomeoneElseDonationValue = function( num, className, inputName ){
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

  // 檢查長度
  var _checkLength = function( arrData, len ){
    if( arrData.length < len ){
      return false;
    } else {
      return true;
    }
  };

  // 檢查正規表達式
  var checkReg = function( arrData, reg ){
    if( !reg.test( arrData ) ){
      return false;
    } else {
      return true;
    }
  };

  // 檢查值
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
        hasFillIn = _checkLength( arr[3], 5 );
        if( !hasFillIn ) return hasFillIn;
        break;
      case 'phone':
        hasFillIn = _checkLength( arr[0], 7 );
        if( !hasFillIn ) return hasFillIn;
        break;
      case 'email':
        hasFillIn = checkReg( arr[0], emailReg );
        if( !hasFillIn ) return hasFillIn;
        break;
      default:
        break;
    }

    constructor[type] = true; // 檢查區塊完成
    return hasFillIn;

  };

  // 是否顯是錯誤
  var _checkDiv = function( div, classDiv ){
    ( !div ) ? uiVariety.addErrorClass( classDiv ) : uiVariety.removeErrorClass( classDiv );
  };

  // 檢查表單內容
  var _checkInput = function( data, mainDiv ){

    var nameArr = [data.firstNameVal, data.lastNameVal],
        addressArr = [data.addressOneVal, data.cityVal, data.stateVal, data.zipCodeVal],
        phoneArr = [data.phoneVal],
        emailArr = [data.emailVal],
        hasSomeoneElseDonationArr = [data.someoneFirstNameVal, data.someoneLastNameVal];

    var checkName = _checkValue( 'name', nameArr ),
        checkAddress = _checkValue( 'address', addressArr ),
        checkPhone = _checkValue( 'phone', phoneArr ),
        checkEmail = _checkValue( 'email', emailArr ),
        checkHasSomeoneElseDonation = _checkValue( 'hasSomeoneElseDonation', hasSomeoneElseDonationArr );

    _checkDiv( checkName, mainDiv.nameDiv );
    _checkDiv( checkAddress, mainDiv.addressDiv );
    _checkDiv( checkPhone, mainDiv.phoneDiv );
    _checkDiv( checkEmail, mainDiv.emailDiv );

    if( constructor.hasSomeoneElseDonationChange ) _checkDiv( checkHasSomeoneElseDonation, mainDiv.hasSomeoneElseDonationDiv );

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

  // 新增錯誤class
  var _addErrorClass = function( divName ){
    divName.addClass("error");
  };

  // 移除錯誤class
  var _removeErrorClass = function( divName ){
    divName.removeClass("error");
  };

  // 區塊顯示
  var _blockDisplayShow = function( divName ){
    divName.show();
  };

  // 區塊隱藏
  var _blockDisplayHide = function( divName ){
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
      someoneMessage: $("textarea[name=someoneMessage]"),
      someone:  $("input[name=field]")
    };
  
    var className = {
      mainName: $(".main_name"),
      mainAddress: $(".main_address"),
      mainPhone: $(".main_phone"),
      mainMail: $(".main_mail"),
      defaultMain: $(".default_main"),
      someoneName: $(".someone_name"),
      defaultMainDiv: $(".default_main")
    };

    var submitBtn = $(".main_submit").find("button");

    var mainDiv = {
      nameDiv: className.mainName, // 姓名區塊
      addressDiv: className.mainAddress, // 地址區塊
      phoneDiv: className.mainPhone, // 電話區塊
      emailDiv: className.mainMail, // email區塊
      hasSomeoneElseDonationDiv: className.someoneName // 其他捐款人名義區塊
    };

    // 是否用其他人名義捐款
    inputName.someone.on( "change", function(){
      var self = $(this);
      var someoneValue = parseInt( self.val() ); // 字串轉數值
      formObj.hasSomeoneElseDonationValue( someoneValue, className, inputName );
    });

    // submit送出
    submitBtn.on( "click", function(){
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
      formObj.checkInput( data, mainDiv );
    });

  };

  return {
    init: init
  };

}());

$(function(){

  myPage.init();

});