test('Test the AstAnalyzer constructor', function() {
    ok(new AstAnalyzer('1 + 2;'));
    ok(new AstAnalyzer(''));
});
