import PocketBase from 'pocketbase';

const pb = new PocketBase('https://super-space-fortnight-76wrvqrqrggf4vj-8090.app.github.dev');

...

// fetch a paginated records list
const resultList = await pb.collection('users').getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
});

// you can also fetch all records at once via getFullList
const records = await pb.collection('users').getFullList({
    sort: '-created',
});

// or fetch only the first record that matches the specified filter
const record = await pb.collection('users').getFirstListItem('someField="test"', {
    expand: 'relField1,relField2.subRelField',
});
