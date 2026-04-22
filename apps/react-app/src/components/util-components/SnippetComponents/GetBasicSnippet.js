
const snippet={
    javascript: `// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
console.log("Try code editor");
    `,
    cpp:`// Online C++ compiler to run C++ program online
#include <iostream>
int main() {
    // Write C++ code here
    std::cout << "Try code editor";
    return 0;
}
        `,
    java:`// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class Main {
    public static void main(String[] args) {
    System.out.println("Try programiz.pro");
    }   
}
    `
}


function getSnippet(language){
    console.log(`language is ${language}`);
    // if(language == "C++" ) language = "cpp";
    return snippet[language];
}

export default getSnippet;