app.controller('homeCtrl', function($scope, $state, $ionicLoading, $ionicSlideBoxDelegate, dataShare, $timeout) {
$scope.user={place:''};


//    callLatLongFromNamtive = function (lat,longs){
//    alert(lat+"_"+longs);
//    }
    $scope.showList =function(){
        $state.go('menuData.resultList');
    }
    try{

     $ionicPlatform.ready(function() {
      window.plugins.speechRecognition.hasPermission(
       $scope.successCallback,  $scope.errorCallback);
      });
      }
    catch(e){}

       $scope.successCallback = function(data){
    console.log("S"+data);
    if(data == false){
        try{
        $scope.user.place="";
    window.plugins.speechRecognition.requestPermission(
       $scope.successPermission,  $scope.errorPermission);
        }
        catch(e){}
    }
      }
        $scope.errorCallback = function(data){
    console.log(data);
      }
       $scope.successPermission = function(data){
    console.log("S"+data);
      }

       $scope.errorPermission = function(data){
    console.log("F"+data);
      }

      $scope.callSpeechtoText = function(){
        try{
          var settings = {
          lang: "en-US",
          showPopup: true
      };
//      $ionicLoading.show({
//          	      template: '<p>listening.....</p>'
//          	    });
      window.plugins.speechRecognition.startListening(
         $scope.successSpeech,   $scope.failureSpeech,  settings);
      setTimeout(function() {

      }, 10000
      );

        }
        catch(e){}
      }
        $scope.successSpeech = function(data){
          $ionicLoading.hide();
      console.log("S"+data);
      $scope.user.place = data[0];
      $scope.$apply();
      }
        $scope.failureSpeech=function(data){
              $ionicLoading.hide();
        console.log("F"+data);
      }
var datatour = "1~Ajmer~Ajmer~city~26.449895~74.639916~The city of Ajmer gets its name from Ajay Meru. Roughly translated, it means invincible hills. Nestled in the Aravallis south west of Jaipur, Ajmer was founded by Raja Ajaypal Chauhan in the 7th century AD. Till the late 12th century AD, Ajmer was the epicentre of the Chauhan dynasty. After Prithviraj Chauhan’s loss to Mohammed Ghori in 1193 AD, Ajmer became home to several dynasties. The Mughals in particular, fancied it as their favourite destination due to the presence of the holy Ajmer Sharif Dargah.~sonijikinayan.jpg~5~good place to visit~`"
                               + "2~Ajmer~Adhai Din Ka Jhonpra~place~26.455251~74.625133~Adhai Din Ka Jhonpra literally means shed of two-and-a-half days. Alternative transliterations and names include Arhai Din ka Jhompra or Dhai Din ki Masjid. A legend states that a part of the mosque was built in two-and-a-half days (see #Conversion into a mosque below). Some Sufis claim that the name signifies a human\s temporary life on the earth.~adhaiDinkaJhopra.jpg~4.2~Ander Kote Road, Ajmer, Rajasthan 305001, India~`"
                                 + "3~Ajmer~LAKE FOY SAGAR~place~26.445803~74.580013~A beautiful artificial lake that appears flat Lake Foy Sagar was built by an English engineer Mr. Foy in 1892 AD. Interestingly this work was taken up to provide famine relief through wage employment to locals. Lake Foy Sagar offers a beautiful view of the Aravalli range.~lakeofsagar.jpg~3~~good Place to visit || I want to visit again`"
                                 +"4~Ajmer~Mayo Collage~place~26.446283~74.653691~Mayo College is one of India’s oldest independent boarding schools. Founded in 1875 and named after Richard Bourke the 6th Earl of Mayo Mayo College was set up to provide the scions of India’s princely states with an education similar to that provided by the Eton College in Britain. John Lockwood Kipling father of Nobel Laureate Rudyard Kipling as principal of Mayo College furnished the design of the Coat of Arms which shows a Rajput and a Bhil warrior. The college building is one of the finest extant examples of Indo-Saracenic style of architecture.\r\n~mayocollege.jpg~4~~`"
                                                                                          +"5~Ajmer~ANASAGAR LAKE~place~26.474592~74.619547~Anasagar Lake is a scenic artificial lake commissioned and built by Arnoraj Chauhan son of Ajaypal Chauhan between 1135 and 1150 AD. Arnoraj was also known as Anaji which gives the lake its name. Many years later~Mughal Emperor Jahangir added his touch to the lake by laying out the Daulat Bagh Gardens near the lake. Emperor Shah Jahan too contributed to the expansion by building five pavilions known as the Baradari between the garden and the lake.\r\n~ANASAGARLAKE.jpg~3~~`"
                                                                                         + "6~Jaipur~Jaipur~city~26.912434~75.787271~Planned by Vidyadhar Bhattacharya Jaipur holds the distinction of being the first planned city of India. Renowned globally for its coloured gems the capital city of Rajasthan combines the allure of its ancient history with all the advantages of a metropolis. The bustling modern city is one of the three corners of the golden triangle that includes Delhi Agra and Jaipur.~jalmahal.jpg~5~~`"
                                                                                         + "7~Jaipur~AMBER PALACE~place~26.985487~75.851345~Amber pronounced Amer) is at a distance of about 11 kilometres from Jaipur. Now a UNESCO World Heritage Site it was the bastion of the Kachwahas of Amber until the capital was moved to the plains to what is today Jaipur. The palace located in craggy hills is a beautiful melange of Hindu and Mughal styles. Raja Man Singh I began construction in 1592 and the palace which was built as a strong safe haven against attacking enemies was completed by Mirja Raja Jai Singh. The contrast between the harsh exterior and the inviting interior couldn’t be more surprising. Made entirely of red sandstone and white marble visitors are left spellbound by the magnificence of the palace that utilises carvings precious stones and mirrors. The splendour of the palace is enhanced by the breath-taking vista of the Maota Lake in front. The palace is nearly seven centuries old and has a legendary past. Originally a small structure that the Rajputs won from the Meena tribes it was later transformed into the grand Amber Palace.~amerpalace.jpg~2~~good place to wisit`"
                                                                                         + "8~Jaipur~BIRLA TEMPLE~place~26.455251~74.625133~The Lakshmi-Narayan Temple or the Birla Temple as it is more popularly known as is located at the base of Moti Dungari. Built on an elevated platform this comparatively modern temple is built entirely of white marble and dominates the skyline of south Jaipur. The temple was commissioned and built by renowned Indian industrialists the Birlas in 1988. The temple is dedicated to Lord Vishnu also called Narayan and his companion Lakshmi the Goddess of wealth and good fortune. The temple is a work of art and has a marvellous display of exquisite carvings and sculptures covering many mythological themes. The eye is drawn to the images of Laxmi and Narayan carved as they are from one piece of marble. The top of the temple has three domes each representing the three religions followed in India. This is designed to pay homage to secular India. The temple looks spectacular at night when it is lit up. Other than the main temple the complex has a museum that exhibits the earlier belongings of the Birla family.\r\n~birlatemple.jpg~4.2~Ander Kote Road Ajmer Rajasthan 305001 India~`"


                                                                                         + "9~Jaipur~CITY PALACE~place~26.925771~75.823658~Located deep within the walled city the City Palace Complex was conceived and built by Maharaja Sawai Jai Singh II the founder of Jaipur. A beautiful fusion of Mughal and Rajput architecture the palace is still home to the last ruling royal family which lives in a private section of the palace. Maharaja Sawai Jai Singh II is credited with building most of the structures but it was expanded upon by later rulers as well. The City Palace Complex includes the Mubarak Mahal the palace of reception) and the Maharani’s Palace the palace of the queen). Mubarak Mahal now houses the Maharaja Sawai Man Singh II Museum and displays a vast and unique collection of royal costumes delicate Pashmina Kashmiri) shawls Benaras silk saris and other dresses with Sanganeri prints and folk embroidery. The clothes of Maharaja Sawai Madho Singh I are also on display. The Maharani\s Palace surprisingly has an interesting display of very well-preserved Rajput weaponry some dating back to the 15th century. Other than the arms the palace is adorned with beautiful paintings on the ceiling that are well-maintained.\r\n~citypalace.JPG~4~~`"
                                                                                         + "10~Jaipur~Hawa mahal~place~26.923936~75.826744~Hawa Mahal literally the Palace of Winds was built in 1799 by the poet king Sawai Pratap Singh as a summer retreat for him and his family. It also served as a place where the ladies of the royal household could observe everyday life without being seen themselves. This unique five-storey structure is a blend of Hindu and Islamic architecture and the exterior with its small latticed windows called jharokhas) resembles the crown of Lord Krishna. The windows also serve as an air-conditioner of sorts blowing cool air throughout the palace making it the perfect retreat during summers. Built from pink sandstone the Hawa Mahal is Jaipur’s iconic landmark and visitors can view its complete magnificence from outside from across the road. However it is also possible to climb right up to the top for a wonderful view from the windows. Today the Mahal is maintained by the Archaeological Department of the Government of Rajasthan and also houses an archaeological museum in the courtyard.\r\n~hawamahal.jpg~~~`"
                                                                                          +"11~Jaipur~JANTAR MANTAR~place~28.627055~77.216627~Now a UNESCO World Heritage Site Jantar Mantar in Jaipur is considered to be the largest of the five astronomical observatories built by Maharaja Sawai Jai Singh II the founder of Jaipur. It contains sixteen geometric devices designed to measure time track celestial bodies and observe the orbits of the planets around the sun. It also houses the Interpretation Centre that helps the tourists to understand about the working principles & chronolgy of the observatory.\r\n~jantarmantar.jpg~3~~Google place to visit`"
                                                                                         + "12~Jaipur~JAIGARH FORT~place~26.985088~75.845593~About 15 kilometres from Jaipur Jaigarh Fort was built by Sawai Jai Singh II sometime in the early 18th century amidst the arid rocky and thorn-scrub covered hills. Despite its ancient construction it still retains most of its imposing citadel appearance. Visitors can see the world’s largest cannon – Jaiban at the fort.\r\n~jaigarhfort.jpg~3~~Google place to visit`"
                                                                                          +"13~Jaipur~JAL MAHAL~place~26.965604~75.859205~One of the most wonderful sights in Jaipur is the beautiful Jal Mahal or Lake Palace. The light sand coloured stone walls and the deep blue of the water make for a wonderful contrast. The palace appears to float in the centre of Man Sagar Lake where its magnificent exteriors can be enjoyed by tourists.\r\n~jalmahal.jpg~3~~Google place to visit`"
                                                                                         + "14~Jaipur~NAHARGARH FORT~place~26.937317~75.815480~Now a UNESCO World Heritage Site Jantar Mantar in Jaipur is considered to be the largest of the five astronomical observatories built by Maharaja Sawai Jai Singh II the founder of Jaipur. It contains sixteen geometric devices designed to measure time track celestial bodies and observe the orbits of the planets around the sun. It also houses the Interpretation Centre that helps the tourists to understand about the working principles & chronolgy of the observatory.\r\n~nahargarhfort.jpg~3~~Good place to visit`"
                                                                                          +"15~Jaipur~NAHARGARH BIOLOGICAL PARK~place~27.016057~75.864463~Nahargarh Biological Park a part of the Nahargarh sanctuary is located about 12 km from Jaipur on the Jaipur-Delhi highway. It encompasses a large area of 720 hectares and is situated under the Aravalli range. The Park is famous for its vast flora and fauna and its main aim is to conserve it. It also doubles up as a great place to educate people and conduct research on existing flora and fauna. At Nahargarh Biological Park ornithologists can expect to see over 285 species of birds of which the most popular is the white-naped tit which can only be found here. When you visit the Park make sure you also head to Ram Sagar which is a famous among bird watchers and makes for a great spot to catch different varieties of birds. While here you can stay at well-equipped and famous places such as Ganga Vilas Gopal Vilas and Lalit Vilas which were famous with the maharajas of the yore as hunting lodges. The Nahargarh Zoological Park is also worth a visit and houses animals such as Asiatic lions Bengal tigers panthers hyenas wolves deer crocodiles sloth bear Himalayan black bear wild boar etc. The zoo is open from 15th March – 14th October between 8.30 am to 5.30 pm and from 15th October – 14th March between 9.00 am to 5.00 pm. It is closed on Tuesdays so make sure you plan your visit accordingly. Ticket Cost- Indian visitors: 50/- per person| Foreigner: 300/- per person| Student: 20/- per student| Car/jeep: 300/- per vehicle| Motor cycle: 30/- per vehicle| Auto rickshaw: 60/- per vehicle| Bus: 500/- per vehicle| Camera Indian): 200/- | Camera Foreigner): 400/- | Video Camera Indian): 500/- | Video Camera Foreigner): 1000/-.\r\n~nahargarhBilogicalpark.jpg~3~~Good place to visit`"
                                                                                          +"16~Jaipur~VIDYADHAR GARDEN~place~26.899791~75.853619~Located near Sisodia Garden this is yet another beautiful garden which is a must-see for visitors. It is named after Vidyadhar Bhattacharya the Chief Architect of Jaipur.\r\n~vidydhargarden.jpg~3~~Good place to visit`"
                                                                                          +"17~Jaipur~The Oberoi Rajvilas~Hotel~26.875940~75.883759~The Oberoi Rajvilas is unique amongst hotels in Jaipur; a royal resort set in a breathtaking thirty two acre oasis of beautiful landscaped gardens filled with beautiful trees and exotic birdlife. Built around an 18th century Shiva temple where guests can experience chanting with a Hindu priest~meditation and morning yoga The Oberoi Rajvilas Jaipur is a haven of mystical peace and natural serenity.~oborai.jpg~4.6~Address: Goner Rd Jagdish Colony Paldi Meena Jaipur Rajasthan 302031 awesome hotel to stay and liabilities`"
                                                                                          +"18~Jaipur~The Lalit Jaipur~Hotel~26.840119~75.807399~The LaLiT Jaipur is located close to the airport and is situated in close proximity to key commercial and business locations. It operates 231 rooms and suites and offers over 26,000 square feet of conference and banqueting space for both indoor and outdoor events. ~lalit.jpg~4.4~2B & 2C Jagatpura Road Near Jawahar Circle Jaipur Rajasthan 302017 awesome hotel`"
                                                                                          +"19~Jaipur~ITC Rajputana a Luxury Collection Hotel Jaipur~Hotel~26.919728~75.791499~Experience the finest luxury hotel in Jaipur - ITC Rajputana where we are proud to offer one of the best accommodation in the city with a host of comforts and services in settings that reflect the spirit of Rajasthan and its royalty.~itc.jpeg~4.5~~awesome hotel`"
                                                                                          +"20~Jaipur~Jaipur Marriott Hotel~Hotel~26.842024~75.796557~Experience a winning combination of traditional luxury and modern convenience at the Jaipur Marriott Hotel. ~mariot.jpg~4.4~Ashram Marg Near Jawahar Circle Jaipur Rajasthan 302015~awesome hotel`"
                                                                                          +"21~Jaipur~Taj Jai Mahal Palace~Hotel~26.912766~75.786256~Step into a 270-year-old Indo-Saracenic architectural masterpiece set amidst landscaped Mughal gardens at Taj Jai Mahal Palace in Jaipur.At this luxury heritage hotel you experience unparalleled opulence with tantalising comforts.~taj.jpg~4.6~Jacob Road Civil Lines Jaipur Rajasthan 302006~awesome hotel`"
                                                                                         + "22~Jaipur~Radisson Blu Jaipur~Hotel~26.842566~75.794158~Welcome to the Radisson Blu Jaipur conveniently situated just two kilometers from Jaipur International Airport JAI) and within walking distance of World Trade Park one of the area’s leading corporate and shopping destinations.~radison.jpg~4.3~Plot No. 5 - 6 Airport Plaza Tonk Rd Jai Jawan-2 Choti Chopad Chandrakala Colony Mata colony Jaipur Rajasthan 302018 awesome hotel`"
                                                                                          +"23~Jaipur~Holiday Inn Jaipur City Centre~Hotel~26.902763~75.792656~Holiday Inn Jaipur City center is a 5-star property located in the Pink City of India. Just few minutes drive to Railway Station Bus Stand and Airport.~holiday.jpg~4.4~ Holiday Inn ,Plot No. 1 22 Godam Circle,Sardar Patel Road,C Scheme Jaipur Rajasthan 302001~awesome hotel`"
                                                                                          +"24~Jaipur~Rambagh Palace~Jaipur Hotel~26.898331~75.808562~Traverse the royal history of Rajasthan at Rambagh Palace once the residence of the Maharaja of Jaipur. Partake of a wealth of experiences that resound with memories and indulgences of a bygone era.~rambagh.JPG~4.6~Bhawani Singh Rd Rambagh Jaipur Rajasthan 302005 awesome hotel`"
                                                                                          +"25~Jaipur~The Raj Palace~Hotel~26.935319~75.835152~In Jaipur Hotels Right in the heart City Center of Jaipur The Raj Palace is an imposing palace hotel that holds you spellbound. The oldest mansion in Jaipur originally called ‘The Chaumoo Haveli’ it was built in 1727. It was named after the last ruler of Chaumoo Thakur Raj Singh. In 1996 Princess Jayendra Kumari converted it into a luxurious palace hotel. It still retains the splendor and a lot of artefacts from the bygone era. ~raj.jpg~4.3~Near Jorawer Singh Gate Amer Road Jaipur Rajasthan 302002~awesome hotel`"
                                                                                          + "26~Jaipur~Fairmont Jaipur~Hotel~27.030756~75.889854~Jaipur the “Pink City” and the stunning capital of the Indian state of Rajasthan is a hub for tourists and visitors from all over the world looking to explore and discover a history that is rich and vibrant even today evident in the city\s breathtaking forts and palaces. Tranquil gardens and broad avenues which were painted pink in 1876 to welcome the Prince of Walesa dd to the historic charm and rich culture of this unforgettable city.~fair.jpg~4.6~ 2 Riico Kukas Jaipur Rajasthan 303101~awesome hotel`"
                                                                                          + "27~Udaipur~Udaipur~city~24.585445~73.712479~Often referred to as the \Venice of the East\ the city of lakes Udaipur is located around azure water lakes and is hemmed in by lush green hills of Aravallis. The famous Lake Palace located in the middle of Lake Pichola is one of the most beautiful sights of Udaipur. It is also home to Jaisamand Lake claimed to be the second largest man-made sweet water lake in Asia. The beautiful City Palace and Sajjangarh Monsoon Palace) add to the architectural beauty and grandeur of the city. The city is also known for its profusion of zinc and marble. Solar observatory in Lake Fateh Sagar is the only observatory in India located on an island and has been made on the pattern of  Big Bear Lake in Southern California. The ten-day Shilpgram Festival which starts from 21 Dec to 30 Dec pulls in a large number of people interested in arts and crafts.\r\n~monsoonpalace.jpg~3~~`"
                                                                                          + "28~Udaipur~UDAIPUR CITY PALACE~place~24.576442~73.683511~The City Palace towers over Lake Pichola. The balconies cupolas and towers of the palace give a wonderful view of the lake and the surrounding city. This complex actually consists of four major and several minor palaces that collectively form the magnificent City Palace. The main part of the palace is now preserved as a museum displaying artifacts.\r\n~citypalace.jpg~3~~`"
                                                                                          +"30~Udaipur~JAG MANDIR~place~24.567594~73.677761~Jagmandir is a palace built on an island on the Lake Pichola. Also called the ‘Lake Garden Palace’ the construction for this began in 1620 and was completed around 1652. The royal family used the palace as its summer resort and for hosting parties. Interestingly Prince Khurram - later Emperor Shah Jahan - was given shelter here when he rebelled against his father Emperor Jahangir. The Palace had such an impact on Emperor Shah Jahan that it went on to become the inspiration for one of the most magnificent Wonders of the World The Taj Mahal.\r\n~jagmandir.jpg~3~~`"
                                                                                          +"31~Udaipur~AHAR MUSEUM~place~24.586390~73.721164~Ahar Museum is in close proximity to an impressive cluster of cenotaphs of the Maharanas of Mewar. The museum has a small but rare collection of earthen pottery. You can also browse through sculptures and archaeological finds a few dating back to 1700 BC. A 10th century metal figure of Buddha is a special attraction here.\r\n~aharmusem.jpg~3~~`"
                                                                                          +"32~Udaipur~JAGDISH TEMPLE~place~24.579668~73.683777~An example of the Indo-Aryan style of architecture Jagdish Temple was built in 1651 and continues to be one of the most famous temples in and around Udaipur. Dedicated to Lord Vishnu the structure is an architectural marvel with carved pillars graceful ceilings and painted walls. This three-storied temple was built by Maharana Jagat Singh I.\r\n~jagdeestemple.jpg~3~~`"
                                                                                          + "33~Udaipur~FATEH SAGAR LAKE~place~24.601400~73.674223~This delightful lake~bordered by hills and woodlands lies to the north of Lake Pichola. This artificial lake is connected to Lake Pichola by a canal. The lake houses the beautiful Nehru Island as well as an islet on which stands the Udaipur Solar Observatory. It was inaugurated by the Duke of Connaught and was initially called Connaught Bundh.\r\n~fatehsagarlake.jpg~3~~`"
                                                                                          +"34~Udaipur~LAKE PICHOLA~place~24.572000~73.679000~Picholi was the name of a village that lent its name to the lake. The islands of Jagniwas and Jagmandir are housed in this lake. Along the eastern banks of the lake lies the City Palace. A boat ride in the lake around sunset offers a breathtaking view of the Lake and City Palace.\r\n~lakepichola.jpg~3~~`"
                                                                                          +"35~Udaipur~SAHELIYON KI BARI~place~24.602999~73.685184~Built by Maharana Sangram Singh II as a garden for women Saheliyon-ki-Bari or the Garden of the Maidens is a popular tourist destination. Along with a small museum it has several attractions such as marble elephants fountains kiosks and a lotus pool.~saheliyonkibari.jpg~3~~`"
                                                                                          +"36~Udaipur~GULAB BAGH AND ZOO place~24.602999~73.685184~Gulab Bagh Sajjan Niwas Garden) is the largest garden in Udaipur. Spread over 100 acres the garden proudly displays innumerable species of roses from which it also gets its name.~gulabbaag.jpg~3~~`";
var datourArr = datatour.split("`");
if(tourApp.countRow()=="0"){
 for(var i=0;i<datourArr.length;i++){
  var datTourArraycol = datourArr[i].split("~");

  tourApp.insertTourApp(datTourArraycol[0],datTourArraycol[1],datTourArraycol[2],datTourArraycol[3],datTourArraycol[4],datTourArraycol[5],datTourArraycol[6],datTourArraycol[7],datTourArraycol[8],datTourArraycol[9],datTourArraycol[10]);


  }
  }
  //alert(tourApp.searchPlace( "Ajmer", "", ""));
  //tourApp.OpenMapNavigation();
 // tourApp.openUber("com.ubercab");
 // tourApp.openUber("com.olacabs.customer");

//tourApp.insertTourApp(datatour);

$scope.$watch('user.place', function(newValue) {

                if (newValue!="") {
var dataPlace = "";
                newValue = newValue.toUpperCase()
                if(newValue.indexOf("JAIPUR")>-1){
                dataPlace =  tourApp.searchPlace( "JAIPUR", "JAIPUR", "JAIPUR");
                localStorage.setItem("data",dataPlace);
                      $state.go("menuData.resultList");
                }
                else if(newValue.indexOf("AJMER")>-1){
                dataPlace = tourApp.searchPlace( "AJMER", "AJMER", "AJMER");
                localStorage.setItem("data",dataPlace);
                                      $state.go("menuData.resultList");
                }
                 else if(newValue.indexOf("UDAIPUR")>-1){
                          dataPlace = tourApp.searchPlace( "UDAIPUR", "UDAIPUR", "UDAIPUR");
                          //dataShare.storedata("data",dataPlace);
                          localStorage.setItem("data",dataPlace);
                                    $timeout(function(){
                                        $state.go("menuData.resultList");
                                    },500);

                                }

                                }
            });

//tourApp.displayLocationSettingsRequest();
});
