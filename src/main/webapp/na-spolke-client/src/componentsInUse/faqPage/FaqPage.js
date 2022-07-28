import FaqComponent from "./FaqComponent";

function FaqPage(){
    const question1 = "Czy mogę założyć konto jeżeli nie należę do żadnej spółki?"
    const answer1 = "Konto na platformie mogą założyć tylko osoby które chcą zarejestrować swoją spółkę " +
                        "lub zostały do niej zaprszone."

    const question2 = "Należę do wielu spółek, czy mogę do nich dołączyć posiadając jedno konto?"
    const answer2 = "Możesz przypisać swoje konto do wielu spółek."

    const question3 = "Czy wielkość spółki wpływa na pobierane opłaty?"
    const answer3 = "Rozmiar spółki nie ma znaczenia w kwesti opłat za korzystanie z aplikacji, " +
        "pełną rozpiskę opłat można zobaczyć przechodząc do zakładki \"Cennik\"."

    const question4 = "Dla kogo skierowana jest wasz produkt?"
    const answer4 = "Naszą aplikacje kierujemy do spółek akcyjnych oraz kancelarii prawnych."



    return <>
        <FaqComponent count="1" question={question1} answer={answer1}/>
        <FaqComponent count="2" question={question2} answer={answer2}/>
        <FaqComponent count="3" question={question3} answer={answer3}/>
        <FaqComponent count="4" question={question4} answer={answer4}/>
    </>
}
export default FaqPage