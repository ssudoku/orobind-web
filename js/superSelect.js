var storer = [];
$.fn.extend({
	superSelect:function(){
		//1. for each select element in the query, store its attributes in an object
		$(this).each(function(index){
			var optionArray = [];
			$(this).find('option').each(function(){
				var optionObj = {
					"text": $(this).text(),
					"obj": this,
					"order": $(this).index()
				}
				optionArray.push(optionObj);
			});
			var tempObj = {
				"order":index,
				"obj":this,
				"options":optionArray
			};
			storer.push(tempObj);

			//2. then hide it and assign data-values to the options
			$(this).hide().prop("data-order",index);

			//3. create a pseudo-select div with data-order same as the one saved in the object, as well as added to the original select element
			var pseudo = '<div class="superSelect" data-order="'+ index +'">'
			+ '<div class="superSelectDefault"></div>'
			+ '<div class="superSelectDropDown"><ul class="superSelectDropDownList">'
			+ '</ul></div>'
			+ '<div class="superSelectModal"><div class="superSelectModalInner">'
			+ '<ul class="superSelectDropDownList">'
			+ '</ul></div></div>'
			+ '</div>';

			//4. attach the created div in place of the original select.
			$(this).after(pseudo);
			var thisElem = $(this).parent().find(".superSelect");
			//5. populate the options as child div elements with data-order as the index of each original option
			thisElem.find(".superSelectDefault").text(optionArray[0]["text"]);
			$.each(optionArray, function(i){
				var opt = '<li class="superSelectDropDownListItem" data-order="'+ optionArray[i]["order"] +'">'+ optionArray[i]["text"] +'</li>';
				thisElem.find(".superSelectDropDownList").append(opt);
			});
		});
		//6. create the following events
		$(storer).each(function(indx){
			var elem = storer[indx]["obj"];
			var par = elem.parentNode;
			//7. superSelect elements when clicked, should show the drop down in large screens and selection modal in small screens
			$('.superSelect[data-order="'+ indx +'"] .superSelectDefault').click(function(e){
				openModal(par);
			});
		});
		//8. when an option in the dropdown or the selection modal is clicked, it should be updated in the main element
		$('.superSelectDropDownListItem').click(function(e){
			populateDefault(this);
			chooseOption(this);
			closeModal($(this).parents(".superSelect")[0]);
		});
		$(document).on("click",".superSelectModal",function(){
			$(".superSelectModal").removeClass("active");
		});
		$(document).mousedown(function(e){
			if($(".superSelectDropDown").is(":visible")){
				var that = e.target;
				if($(that).hasClass("superSelectDropDown") || $(that).hasClass("superSelectDefault") || $(that).parents(".superSelectDropDown").length > 0){
					//do nothing
				}
				else {
					$(".superSelectDropDown:visible").slideUp(75);
				}
			}
		});
		function populateDefault(opt){
			var x = $(opt).parents(".superSelect").find(".superSelectDefault");
			x.text($(opt).text());
		}
		//9. in the hidden select element corresponding to the current one, the appropriate option has to be set
		function chooseOption(opt){
			var i = $(opt).parents(".superSelect").attr("data-order");
			var j = $(opt).attr("data-order");
			for(var x in storer){
				if(storer[x]["order"] == i){
					for (var y in storer[x]["options"]){
						if(storer[x]["options"][y]["order"] == j) {
							var selobj = storer[x]["options"][y]["obj"];
							$(selobj).parents("select").val($(opt).text());
							$(selobj).parents("select")[0].selectedIndex = j;
							$(selobj).parents("select").change();
							break;
						}
					}
				}
			}
		}
		function openModal(par){
			if(window.innerWidth < 768){
				$(par).find(".superSelectModal").toggleClass("active");
			}
			else {
				$(par).find(".superSelectDropDown").slideToggle(75);
			}
		}
		//10. the dropdown or modal has to be closed after the previous action
		function closeModal(par){
			if($(par).find(".superSelectDropDown").is(":visible")){
				$(par).find(".superSelectDropDown").slideToggle(75)
			}
			else if($(par).find(".superSelectModal").is(":visible")) {
				$(par).find(".superSelectModal").toggleClass("active");
			}
		}
		return this;
	}
});
