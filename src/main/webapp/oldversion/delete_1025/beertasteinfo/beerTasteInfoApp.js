


function ajaxBeerTasteInfoList(no) {   // scno로 받아서 넘기기
	$.getJSON(serverAddr + "/beertasteinfo/list.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		var arr = result.data
		
		$("#tasteAddBtn").click(function(event) {
			location.href = "../beertasteinfo/beerTasteReview.html?no=" + $('#beerTable .noBtn').attr('data-no')
		});
		
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
//		var template = Handlebars.compile($("#trTemplateText").html())
//	    $("#beerTable tbody").html(template(result))
	    
	    
	    var radarData = {
		  labels : ["BITTER (쓴맛)","SOUR (신맛)","SWEET (단맛)","SPARKLE (탄산)","BODY (풍미)","AROMA (향미)"],
		  datasets : [
		    {
		      backgroundColor: "rgba(255,187,0,.7)",  //영역 전체배경색
		      borderColor: "rgba(255,0,0,.5)",        //영역 선
		    //  pointBorderColor: "rgba(0,84,255,1)", // 꼭지점 테두리 색
		    //  pointBackgroundColor: "rgba(29,219,22,1)", // 꼭지점 안에 색
		    //  data : [10,6,9,8,6,4]
		      data : [arr[0].bitter,arr[0].sour,arr[0].sweet,arr[0].sparkle,arr[0].body,arr[0].aroma]
		    }
		  ]
		}

		var radarOption = {
		  legend: false,  // 제목 없애기
	      scale : {
	    	pointLabels : {   //라벨글자 크기
	            fontSize: 14,
	            fontStyle: "bold",
	            fontColor: "rgba(255,187,0,1)"
	      },
	      ticks: {
	        min: 0,
	        max: 10,
	        stepSize: 1,
	        fontSize: 12,
	        fontStyle: "bold",
	        fontColor: "rgba(140,140,140,1)", //차트 점수색
	        //backdropColor: "rgba(0,255,255,1)"  // 차트점수배경색
	      },
	      gridLines: {
	        color: "rgba(140,140,140,1)" //차트라인 색
	      }
	      }
		}

		var ctx2 = document.getElementById("radarChart");
		var myNewChart = new Chart(ctx2, {
		  type: "radar",
		  data: radarData,
		  options : radarOption
		})
		
		var template = Handlebars.compile($("#beerTasteScoreText").html())
		$("#beerchart span").html(template(result.data[0])) // 확인필요 [0]으로 해놔도 문제없나?
		
    })
}



function ajaxBeerTasteInfoListDetail(no) {  //brno로 받아서 넘기기
	$.getJSON(serverAddr + "/beertasteinfo/detailList.json?no=" + no, function(obj) {
		var result = obj.jsonResult
		var arr = result.data
		
		$("#tasteAddBtn").click(function(event) {
			console.log(no)
			location.href = "../beertasteinfo/beerTasteReview.html?no=" + no
			//result.data[0].brno
		});
		
		
		if (result.state != "success") {
	    	 alert("서버에서 데이터를 가져오는데 실패했습니다.")
	    	 return
	    }
		
		
//		var template = Handlebars.compile($("#trTemplateText").html())
//	    $("#beerTable tbody").html(template(result))
	    
	    
	    var radarData = {
		  labels : ["BITTER (쓴맛)","SOUR (신맛)","SWEET (단맛)","SPARKLE (탄산)","BODY (풍미)","AROMA (향미)"],
		  datasets : [
		    {
		      backgroundColor: "rgba(255,187,0,.7)",  //영역 전체배경색
		      borderColor: "rgba(255,0,0,.5)",        //영역 선
		    //  pointBorderColor: "rgba(0,84,255,1)", // 꼭지점 테두리 색
		    //  pointBackgroundColor: "rgba(29,219,22,1)", // 꼭지점 안에 색
		    //  data : [10,6,9,8,6,4]
		      data : [arr[0].bitter,arr[0].sour,arr[0].sweet,arr[0].sparkle,arr[0].body,arr[0].aroma]
		    }
		  ]
		}

		var radarOption = {
		  legend: false,  // 제목 없애기
	      scale : {
	    	pointLabels : {   //라벨글자 크기
	            fontSize: 14,
	            fontStyle: "bold",
	            fontColor: "rgba(255,187,0,1)"
	      },
	      ticks: {
	        min: 0,
	        max: 10,
	        stepSize: 1,
	        fontSize: 12,
	        fontStyle: "bold",
	        fontColor: "rgba(140,140,140,1)", //차트 점수색
	        //backdropColor: "rgba(0,255,255,1)"  // 차트점수배경색
	      },
	      gridLines: {
	        color: "rgba(140,140,140,1)" //차트라인 색
	      }
	      }
		}

		var ctx2 = document.getElementById("radarChart");
		var myNewChart = new Chart(ctx2, {
		  type: "radar",
		  data: radarData,
		  options : radarOption
		})
		
		var template = Handlebars.compile($("#beerTasteScoreText").html())
		$("#beerchart span").html(template(result.data[0])) // 확인필요 [0]으로 해놔도 문제없나?
		
		
    })
}


$("#okBtn").click(function(event) {
	  var brno = 0;
	  if (location.search.startsWith("?")) {
		  brno = location.search.split("=")[1];
		}
	  
	  var beerTasteInfo = {
			brno: brno,
	    bitter: parseInt($("#bitterScore").val()),
	    sour: $("#sourScore").val(),
	    sweet: $("#sweetScore").val(),
	    sparkle: $("#sparkleScore").val(),
	    body: $("#bodyScore").val(),
	    aroma: $("#aromaScore").val(),
	    score: $("#avgScore").val()
	  }
	  
	  if (beerTasteInfo.bitter == 0 ) {
		  alert("Bitter(쓴맛)의 점수를 입력 해 주세요.")
		  return
	  } else if (beerTasteInfo.sour == 0) {
		  alert("Sour(신맛)의 점수를 입력 해 주세요.")
		  return
	  } else if (beerTasteInfo.sweet == 0) {
	    alert("Sweet(단맛)의 점수를 입력 해 주세요.")
	    return
	  } else if (beerTasteInfo.sparkle == 0) {
	    alert("Sparkle(탄산)의 점수를 입력 해 주세요.")
	    return
	  } else if (beerTasteInfo.body == 0) {
	    alert("Body(풍미)의 점수를 입력 해 주세요.")
	    return
	  } else if (beerTasteInfo.aroma == 0) {
	    alert("Aroma(향미)의 점수를 입력 해 주세요.")
	    return
	  } else if (beerTasteInfo.score == 0 || beerTasteInfo.score == "" || beerTasteInfo.score < 0 || beerTasteInfo.score > 10) {
	    alert("평점을 입력 해 주세요. (0~10점 사이에만 입력 해 주세요)")
	    return
	  }
	  
	  ajaxAddTasteInfo(beerTasteInfo)
	  
	});
	
	
function ajaxAddTasteInfo(beerTasteInfo) {
	$.post(serverAddr + "/beertasteinfo/add.json" , beerTasteInfo, function(obj) {
		var result = obj.jsonResult
		if (result.state != "success") {
			alert("등록 실패입니다.")
			return
		}
		window.location.href="../beercate/beerCateApp.html"
	//	window.location.href = "../beer/beerDetailApp.html?no=" + result.data.brno + "cate"
	//  좀 전의 페이지로 refresh 해야함.
	}, "json")
}



