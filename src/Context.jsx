import {useState, createContext, useEffect} from "react"
import OpenAI from "openai";
import OPENAI_API_KEY from '../apikey.js'


const Context = createContext()

function ContextProvider({children}) {
    const [conversationQs, setConversationQs] = useState([])
    const [canvasCode, setCanvasCode] = useState("")
 
    
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    

    function saveConversationQuestions(component, LdText) {
      setConversationQs([component, LdText])
      const newList = [component, LdText]
      if(newList[0] === 'expanders') {
        getExpanders(newList)
      } if(newList[0] === 'tabs') {
        getTabs(newList)
      } if(newList[0] === 'linked-references') {
        getRefs(newList) 
      }  else {
      } if(newList[0] === 'sm') {
        getFlipcards(newList) 
      }  else {
      } if(newList[0] === 'md') {
        getFlipcards(newList) 
      }  else {
        return
      }
       
    }

   

  async function getExpanders(newList) {
      console.log(newList)
     const response = await openai.chat.completions.create({
        
       messages: [{ role: "system", content: `Using this code as an exact template
        "<div class="cup-expander cup-expander grey">
        <h3 class="expander-header title" role="button" aria-expanded="false" aria-label="Click to expand">Inception movie</h3>
        <div class="content-block">
            <p>A person’s acquisition of a second language serves as a good example of non-hereditary behaviour and thought, as the sociocultural customs of speaking and interacting may differ from those of their first language. It is through social interaction therefore that the learner can truly develop their cognitive ability in a second language and better understand the customs they ought to inhabit to achieve a higher level of fluency.</p>
        </div>
    </div>", which is based on this initial text from an eLearning storyboard storyboard "<expander: standard>
      Title: Inception movie
      Text: A person’s acquisition of a second language serves as a good example of non-hereditary behaviour and thought, as the sociocultural customs of speaking and interacting may differ from those of their first language. It is through social interaction therefore that the learner can truly develop their cognitive ability in a second language and better understand the customs they ought to inhabit to achieve a higher level of fluency.
      </expander>", please make the same transformation into code for other storyboard text fragments. Each seperate <expander></expander> should have its own <div class="cup-expander cup-expander grey"></div> if there are  multiple <expander> prompts. Always begin the response with a <div>

   
          ###
          storyboard prompt: <expander: standard>
                              Title: Round 1: My roast is ruined
                              Text: As a learner develops, they are encouraged to think as well as speak in the second language, connecting thought and speech. When viewed through the context of EAP learning, this manner of speaking and thinking moves students away from a culture of right-answerism. 
                              </expander>
                              <expander: standard>
                              Title: Round 2: Puss and boots
                              Text: What a lovely war and all the trimmings.
                              </expander>

          code: <div class="cup-expander cup-expander grey"> 
        <h3 class="expander-header title" role="button" aria-expanded="false" aria-label="Click to expand">Round 1: My roast is ruined</h3>
        <div class="content-block">
            <p>As a learner develops, they are encouraged to think as well as speak in the second language, connecting thought and speech. When viewed through the context of EAP learning, this manner of speaking and thinking moves students away from a culture of right-answerism.</p>
        </div>
    </div> ;
    <div class="cup-expander cup-expander grey">
        <h3 class="expander-header title" role="button" aria-expanded="false" aria-label="Click to expand">Round 2: Puss and boots</h3>
        <div class="content-block">
            <p>What a lovely war and all the trimmings.</p>
        </div>
    </div> ;
          
          ###
           storyboard prompt: <expander: standard>
Title: Analysis between rounds
Text: Working lunch used to be presented by a man called Lunchie and all his special friends:
1.	Cleaning the fridge. 
Whereas traditional notions of language learning may have put more weight behind instruction and memorisation techniques, the communicative approach determines that learning takes place in the process of dialogue.
2.	Dig the graves. 
Communicative interaction has especially become a prominent subject in the context of EAP as it leads to improved discourse and critical discussion. Classes on an EAP course often present learners of English a new opportunity to enter verbal academic discourse, enabling them to engage in higher levels of dialogue and therefore effectively develop their linguistics skills and competence, as well as their communication techniques.
3.	Calculating the musical budget.
Knowledge, in this instance, is not an objective truth as just being able to say sentences correctly does not necessarily equate to knowing – it takes social interaction to show one’s true understanding. 
4.	Creating the charts and graphs. 
Given the general lack of recent literature exploring the effects of more students doing their EAP pre-sessional courses online, with specific reference to how the different format can alter communication patterns, my hope is that this study can look into whether Vygotsky’s principles of sociocultural and communicative learning are still evident in modern EAP learning where videoconferencing technology is used.
These analytical results, including cut and pasted delicious data and visual cues, are shared with the experts before the discussion phase begins.
</expander>


          code: <div class="cup-expander cup-expander grey">
  <h3 class="expander-header title" role="button" aria-expanded="false" aria-label="Click to expand">Analysis between rounds</h3>
  <div class="content-block">
    <h3>Analysis between rounds</h3>
    <p>Working lunch used to be presented by a man called Lunchie and all his special friends:</p>
    <ol>
      <li><strong>Cleaning the fridge:</strong> Whereas traditional notions of language learning may have put more weight behind instruction and memorisation techniques, the communicative approach determines that learning takes place in the process of dialogue.</li>
      <li><strong>Dig the graves:</strong> Communicative interaction has especially become a prominent subject in the context of EAP as it leads to improved discourse and critical discussion. Classes on an EAP course often present learners of English a new opportunity to enter verbal academic discourse, enabling them to engage in higher levels of dialogue and therefore effectively develop their linguistics skills and competence, as well as their communication techniques.</li>
      <li><strong>Calculating the musical budget:</strong> Knowledge, in this instance, is not an objective truth as just being able to say sentences correctly does not necessarily equate to knowing – it takes social interaction to show one’s true understanding. </li>
      <li><strong>Creating the charts and graphs:</strong> Given the general lack of recent literature exploring the effects of more students doing their EAP pre-sessional courses online, with specific reference to how the different format can alter communication patterns, my hope is that this study can look into whether Vygotsky’s principles of sociocultural and communicative learning are still evident in modern EAP learning where videoconferencing technology is used.</li>
    </ol>
    <p>These analytical results, including cut and pasted delicious data and visual cues, are shared with the experts before the discussion phase begins.</p>
  </div>
</div> ;
          ###
          storyboard prompt: ${newList[1]}
          code: 
          `,
       }],
         model: 'gpt-4o-mini',
          // max_tokens: 900,
          temperature: 0.8,
        })
      const expanderCode = response.choices[0].message.content.split(';')
      const expanderCodeFiltered = expanderCode.map(item => item.replace(/`|\bhtml\b/g, "").trim())
      console.log(expanderCodeFiltered)
      setCanvasCode(expanderCodeFiltered)
 }
    
 async function getFlipcards(newList) {
    const response = await openai.chat.completions.create({
        
       messages: [{ role: "system", content: `Using this code as an exact template
        "<section id="flipcards" class="fc-${newList[0]}">
         <article class="flipcard-container" role="button" aria-label="flipcard">
        <div class="flipcard-container__inner">
            <div class="flipcard-container__front">
              <div class="flipcard-content__title">Sample Title</div>
                
            </div>
            <div class="flipcard-container__back">
                <div class="flipcard-content__body">Insert flipcard body text here. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis</div>
            </div>
        </div>
    </article> 
         <article class="flipcard-container" role="button" aria-label="flipcard">
        <div class="flipcard-container__inner">
            <div class="flipcard-container__front">
              <div class="flipcard-content__title">Great big title</div>
                
            </div>
            <div class="flipcard-container__back">
                <div class="flipcard-content__body">Glory, Glory Hallelujah, glory for plug one and two. But that glory's been denied, people think they diss my person by stating I'm darkly pack</div>

            </div>
        </div>
    </article> 
         
      </section> pig", which is based on this initial text from an eLearning storyboard storyboard " <flipcards>
      Card 1 
      Title: Sample Title 
      Text: Insert flipcard body text here. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
      
      Card 2 
      Title: Great big title 
      Text: Glory, Glory Hallelujah, glory for plug one and two. But that glory's been denied, people think they diss my person by stating I'm darkly pack 
      </flipcards>"
      please make the same transformation into code for other storyboard text fragments. Each card should have its own <article class="flipcard-container" role="button" aria-label="flipcard"></article>. There can be up to 8 cards. Always begin the response with a <section id="flipcards" class="fc-sm">

   
          ###
          storyboard prompt: <flipcards>
                              Card 1 
                              Title: Only love can break your heart 
                              Text: Bob Stanley is a very good writer as well as a pop star, much like Neil Tenant was before he was in Pet Shop Boys. 
                              
                              Card 2 
                              Title: Good dental hygeine
                              Text: You're absolutely right Robin, you owe your life to good dental hygeine. Always be careful from whom you accept free lemonade. 
                              </flipcards>"

          code: <section id="flipcards" class="fc-${newList[0]}">
         <article class="flipcard-container" role="button" aria-label="flipcard">
        <div class="flipcard-container__inner">
            <div class="flipcard-container__front">
              <div class="flipcard-content__title">Only love can break your heart</div>
                
            </div>
            <div class="flipcard-container__back">
                <div class="flipcard-content__body">Bob Stanley is a very good writer as well as a pop star, much like Neil Tenant was before he was in Pet Shop Boys.</div>
            </div>
        </div>
    </article>
         <article class="flipcard-container" role="button" aria-label="flipcard">
        <div class="flipcard-container__inner">
            <div class="flipcard-container__front">
              <div class="flipcard-content__title">Good dental hygeine</div>
                
            </div>
            <div class="flipcard-container__back">
                <div class="flipcard-content__body">You're absolutely right Robin, you owe your life to good dental hygeine. Always be careful from whom you accept free lemonade. </div>

            </div>
        </div>
    </article>
         
      </section> pig ;
                   
          ###
          storyboard prompt: ${newList[1]}
          code: 
          
          `,
       }],
         model: 'gpt-4o-mini',
          // max_tokens: 900,
          temperature: 0.8,
        })
      const flipcardSmallCode = response.choices[0].message.content.split('pig')
      const flipFiltered = flipcardSmallCode.map(item => item.replace(/`|\bhtml\b/g, "").trim())
      setCanvasCode(flipFiltered)
 }

     async function getTabs(newList) {
      const response = await openai.chat.completions.create({
        
       messages: [{ role: "system", content: `Using this code as an exact template
        "<section id="tabs-component">
        <div class="tabs-container" role="tablist">
            <div class="tabs-container__link default-open" role="tab">Piloting</div>
            <div class="tabs-container__link" role="tab">Check for custard</div>
            <div class="tabs-container__link" role="tab">Recognise the meat</div>
        </div>
        <div class="tab-groups-container">
            <div class="tab-group">
                <div class="fullsize-tab" role="button">Piloting<</div>
                <div class="tab-content" role="tabpanel">
                    <p>Where the last chapter discussed the emerging topic of video online communication in educational settings, this chapter will aim to delve deeper into the overarching theories that have influenced my interest in how online videoconferencing classrooms could negatively affect communication and interaction in an EAP setting. </p>
                </div>
            </div>
            <div class="tab-group">
                <div class="fullsize-tab" role="button">Check for custard</div>
                <div class="tab-content" role="tabpanel">
                    <p>This will later frame the methodological approach to the research as well as the methods used.</p>
                    <p>If one was to approach this question from a positivist perspective, knowledge could be described as what can be unambiguously proven by objective evidence. However, a more interpretivist or critical paradigm would consider knowledge to be more subjective and something that evolves with the culture where it is based.</p>
                </div>
            </div>
            <div class="tab-group">
                <div class="fullsize-tab" role="button">Recognise the meat</div>
                <div class="tab-content" role="tabpanel">
                    <p>However, even though more revolutionary origins of Vygotskian thought may not necessarily be applicable to EAP, the base theory demonstrates that the importance of communication in the learning space is explicit and serves as an insight as to why social interactions are pivotal in sociocultural theory.</p>
                </div>
            </div>
        </div>
    </section> pig
", which is based on this initial text from an eLearning storyboard storyboard "<tabs>
Tab 1
Title: Piloting
Text:  Where the last chapter discussed the emerging topic of video online communication in educational settings, this chapter will aim to delve deeper into the overarching theories that have influenced my interest in how online videoconferencing classrooms could negatively affect communication and interaction in an EAP setting. 
Tab 2
Title: Check for custard
Text: This will later frame the methodological approach to the research as well as the methods used.
      If one was to approach this question from a positivist perspective, knowledge could be described as what can be unambiguously proven by objective evidence. However, a more interpretivist or critical paradigm would consider knowledge to be more subjective and something that evolves with the culture where it is based.  
Tab 3
Title: Recognise the meat
Text: However, even though more revolutionary origins of Vygotskian thought may not necessarily be applicable to EAP, the base theory demonstrates that the importance of communication in the learning space is explicit and serves as an insight as to why social interactions are pivotal in sociocultural theory.
</tabs>" 
, please make the same transformation into code for other storyboard text fragments. For every Tab, create a <div class="tab-group">. There can be up to 8 tab groups with a <div class="tab-group"> inside the <section id="tabs-component">. Please present ONLY the code, no introduction or signoff message. Strictly begin each response with <section id="tabs-component">

   
          ###
          storyboard prompt: <tabs>
Tab 1
Title: Country bumpkins
Text: The key difference that appears to differentiate a traditional banking style of education and a more social approach is the importance attributed to interaction and the manner in which it takes place within a classroom.
In a communicative educational approach, students are not mere, silent receptacles of knowledge, but participants who develop through the practice of speaking and listening frequently with peers and their tutor in order to make meanings and progress their communicative competence.
Tab 2
Title: Fun and laughter
Text: Communicative interaction is especially valued for the development of a second language, and has been judged a key principle in modern language teaching, and especially in EAP. 
Purposes (BALEAP) can-do assessment framework for EAP syllabus designers. The ability to partake in group discussion, involve other participants to share their thoughts and even challenge their tutor are all listed as specific competencies in EAP speaking assessment guidelines. 
Tab 3
Title: Song and dancing
Text: With such importance placed on interaction in order to achieve better inclusivity and further one’s personal development, any obstacles or barriers to interaction could become problematic.
</tabs>


          code:  <section id="tabs-component">
        <div class="tabs-container" role="tablist">
            <div class="tabs-container__link default-open" role="tab">Country bumpkins</div>
            <div class="tabs-container__link" role="tab">Fun and laughter</div>
            <div class="tabs-container__link" role="tab">Song and dancing</div>
        </div>
        <div class="tab-groups-container">
            <div class="tab-group">
                <div class="fullsize-tab" role="button">Country bumpkins</div>
                <div class="tab-content" role="tabpanel">
                    <p>The key difference that appears to differentiate a traditional banking style of education and a more social approach is the importance attributed to interaction and the manner in which it takes place within a classroom.</p>
                    <p>In a communicative educational approach, students are not mere, silent receptacles of knowledge, but participants who develop through the practice of speaking and listening frequently with peers and their tutor in order to make meanings and progress their communicative competence.</p>
                </div>
            </div>
            <div class="tab-group">
                <div class="fullsize-tab" role="button">Fun and laughter</div>
                <div class="tab-content" role="tabpanel">
                    <p>Communicative interaction is especially valued for the development of a second language, and has been judged a key principle in modern language teaching, and especially in EAP.</p>
                    <p>Purposes (BALEAP) can-do assessment framework for EAP syllabus designers. The ability to partake in group discussion, involve other participants to share their thoughts and even challenge their tutor are all listed as specific competencies in EAP speaking assessment guidelines. </p>
                </div>
            </div>
            <div class="tab-group">
                <div class="fullsize-tab" role="button">Song and dancing</div>
                <div class="tab-content" role="tabpanel">
                    <p>With such importance placed on interaction in order to achieve better inclusivity and further one’s personal development, any obstacles or barriers to interaction could become problematic. </p>
                </div>
            </div>
        </div>
    </section> pig ;
          
          ###
          storyboard prompt: ${newList[1]}
          code: 
          
          ` }],
         model: 'gpt-4o-mini',
          // max_tokens: 900,
          temperature: 0.8,
        })
        // temperature: 1.2
   
      const tabsCode = response.choices[0].message.content.split("pig")
      const tabsFiltered = tabsCode.map(item => item.replace(/`|\bhtml\b/g, "").trim())
      setCanvasCode(tabsFiltered)
 }


     async function getRefs(newList) {
      const response = await openai.chat.completions.create({
        
       messages: [{ role: "system", content: `Using these two <li></li> items as an exact template
        "<ul><li>European Environment Agency (EEA) (2002). <a class="inline_disabled" href="https://www.eea.europa.eu/en/analysis/publications/environmental_issue_report_2001_22" target="_blank" rel="noopener">Late lessons from early warnings: the precautionary principle 1896&ndash;2000</a>. <em>European Environment Agency</em>, 10 Jan.</li> pig
    <li>Fitzherbert, E., Struebig, M., Morel, A., Danielsen, F., Bruhl, C., Donald, P. and Phalan, B. (2008). <a class="inline_disabled" href="https://doi.org/10.1016/j.tree.2008.06.012" target="_blank" rel="noopener">How will oil palm expansion affect biodiversity?</a> <em>Trends in Ecology &amp; Evolution</em>, 23(10), 538&ndash;545.</li> </ul> pig
", which is based on these 2 references listed from an eLearning storyboard storyboard 
"European Environment Agency (EEA) (2002). [Late lessons from early warnings: the precautionary principle 1896-2000] (linkto: https://www.eea.europa.eu/en/analysis/publications/environmental_issue_report_2001_22). European Environment Agency, 10 Jan. 
Fitzherbert, E., Struebig, M., Morel, A., Danielsen, F., Bruhl, C., Donald, P. and Phalan, B. (2008). [How will oil palm expansion affect biodiversity?] (linkto: https://doi.org/10.1016/j.tree.2008.06.012). Trends in Ecology & Evolution, 23(10), 538–545. " 
, please convert other text references into the same <li> format, inserting an <a> link into the words inside the [] brackets. Each new reference in the list needs it's own <li> item, and please wrap them all inside a <ul></ul>

   
          ###
          storyboard prompt: Health and Safety Exclusive (2025). [Introduction to asbestos safety: Overview] (linkto: https://www.hse.gov.uk/asbestos/introduction/index.htm). Health and Safety Exclusive. 

Koh, L.P. and Wilcove, D.S. (2008). [Is oil palm agriculture really destroying tropical biodiversity?] (linkto: https://doi.org/10.1111/j.1755-263x.2008.00011.x). Conservation Letters, 1(2), 60–64. 


          code:  <ul><li>Health and Safety Exclusive (2025). <a class="inline_disabled" href="https://www.hse.gov.uk/asbestos/introduction/index.htm" target="_blank" rel="noopener">Introduction to asbestos safety: Overview</a>. <em>Health and Safety Exclusive</em>.</li>
    <li>Koh, L.P. and Wilcove, D.S. (2008). <a class="inline_disabled" href="https://doi.org/10.1111/j.1755-263x.2008.00011.x" target="_blank" rel="noopener">Is oil palm agriculture really destroying tropical biodiversity?</a> <em>Conservation Letters</em>, 1(2), 60&ndash;64.</li> </ul> pig
 ;
          ###
          storyboard prompt: Sutherland, W.J. and Woodroof, H.J. (2009). [The need for environmental horizon scanning] (linkto: https://doi.org/10.1016/j.tree.2009.04.008). Trends in Ecology & Evolution, 24(10), 523–527. 

Cuhls, K.E. (2019). [Horizon Scanning in Foresight – Why Horizon Scanning Is Only a Part of the Game](linkto: https://doi.org/10.1002/ffo2.23). FUTURES & FORESIGHT SCIENCE, 2(1).


          code:  <ul><li>Sutherland, W.J. and Woodroof, H.J. (2009). <a class="inline_disabled" href="https://doi.org/10.1016/j.tree.2009.04.008" target="_blank" rel="noopener">The need for environmental horizon scanning</a>. <em>Trends in Ecology &amp; Evolution</em>, 24(10), 523&ndash;527.</li>
 <li>Cuhls, K.E. (2019). <a class="inline_disabled" href="https://doi.org/10.1002/ffo2.23" target="_blank" rel="noopener">Horizon Scanning in Foresight &ndash; Why Horizon Scanning Is Only a Part of the Game</a>. <em>FUTURES &amp; FORESIGHT SCIENCE</em>, 2(1).</li> </ul> pig

 ;
          
          ###
          storyboard prompt: ${newList[1]}
          code: 
          
          ` }],
         model: 'gpt-4o-mini',
         temperature: 0.8,
        })
       
   
      const refsCode = response.choices[0].message.content.split("pig")
      const refsCodeFiltered = refsCode.map(item => item.replace(/`|\bhtml\b/g, "").trim())
      // .replace(/\bhtml\b/g, "").trim()
      console.log(refsCodeFiltered)
      setCanvasCode(refsCodeFiltered)
 }

            
    return (
        <Context.Provider value={{
            saveConversationQuestions,
            conversationQs,
            canvasCode,
            setCanvasCode 
          }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}