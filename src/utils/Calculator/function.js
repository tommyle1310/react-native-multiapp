export const evaluateExpression = (expression) => {
    // Check if expression is null or undefined
    if (expression == null) {
        console.error("Expression is null or undefined");
        return null;
    }

    // Log the expression for debugging
    // console.log("Expression:", expression);

    // Replace 'sqrt' with its mathematical equivalent 'Math.sqrt'
    expression = expression.replace(/sqrt/g, 'Math.sqrt');

    // Replace 'pow' with its mathematical equivalent 'Math.pow'
    expression = expression.replace(/pow/g, 'Math.pow');

    // Use try-catch to handle potential errors during evaluation
    try {
        // Evaluate the expression
        return eval(expression);
    } catch (error) {
        // Handle any errors that occur during evaluation
        console.error("Error evaluating expression:", error);
        return null; // Return null or handle the error as appropriate
    }
};


export const convertArrToString = (arr) => {
    return arr.join('');
}