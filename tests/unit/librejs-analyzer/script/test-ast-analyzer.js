test('Test the AstAnalyzer constructor', function() {
    ok(new AstAnalyzer('1 + 2;'));
    ok(new AstAnalyzer(''));
});

test('hasFunction', function() {
    var aa = new AstAnalyzer('function hello() { console.log(\'hi\'); }');
    ok(aa.hasFunction());

    aa = new AstAnalyzer('4 + 4;');
    ok(!aa.hasFunction());
});

test('hasEval', function() {
    var aa = new AstAnalyzer('eval(2 + 4);');
    ok(aa.hasEval());

    aa = new AstAnalyzer('function hello() { console.log(\'hi\'); }');
    ok(!aa.hasEval());
});
