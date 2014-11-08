test('Test deepFindInObject', function() {
    var o = {
        b: {
            c: {
                find: 'me'
            }
        }
    };

    ok(util.deepFindInObject(o, 'find', 'me'));
    ok(!util.deepFindInObject(o, 'find', 'notme'));
});

test('Test removeWhitespace', 2, function() {
    strictEqual(util.removeWhitespace('a b c'), 'abc');
    strictEqual(util.removeWhitespace('  \na b\tc   '), 'abc');
});
