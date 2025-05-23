import Mohit_Jain_Resume from "/Mohit_Jain_Resume.pdf";
import Fulton_Internship_Program_Appreciation_Certificate_Spring_2025 from "/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";

export const useDocumentStore = defineStore("document-store", () => {
    const route = useRoute();

    /**
     * This function downloads a document for the visitor to see.
     */
    function downloadDoc() {
        const docIndex = (route.path.includes("resume") ? 0 : 1);
        const DOCUMENTS = [Mohit_Jain_Resume, Fulton_Internship_Program_Appreciation_Certificate_Spring_2025];
        const DOCUMENT_NAMES = ["Mohit_Jain_Resume", "Fulton_Internship_Program_Appreciation_Certificate_Spring_2025"];
    
        const link = document.createElement('a');
        link.href = DOCUMENTS[docIndex];
        link.download = (DOCUMENT_NAMES[docIndex] + '.pdf');
    
        link.click();
        link.remove();
    }

    /**
     * This function mounts a page that hosts a document.
     */
    function mountDocumentPage() {
        initWebData();
        nextTick(() => {
            hideVerticalOverflow();
            window.addEventListener("resize", hideVerticalOverflow);
        });
    }

    /**
     * This function unmounts a page that hosts a document.
     */
    function unmountDocumentPage() {
        document.body.style.overflowY = "";
        window.removeEventListener("resize", hideVerticalOverflow);
    }

    /**
     * This function hides the body's vertical overflow.
     */
    function hideVerticalOverflow() {
        document.body.style.overflowY = "hidden";
    }

    return { downloadDoc, mountDocumentPage, unmountDocumentPage, hideVerticalOverflow }
});