import FaqComponent from "./FaqComponent";

function FaqPage(){
    const firstQuestion = "Czy mogę założyć konto jeżeli nie należę do żadnej spółki?"
    const firstAnswer = "Konto na platformie mogą założyć tylko osoby które chcą zarejestrować spółkę " +
                        "lub zostały zaprszone do spółki."


    return <>
        <FaqComponent count="1" question={firstQuestion} answer={firstAnswer}/>
    </>
}
export default FaqPage