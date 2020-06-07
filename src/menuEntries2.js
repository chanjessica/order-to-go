import firebase from 'firebase';
import React from 'react';

const db = firebase.firestore();

// db.collection('journalEntries').doc('yY1FbU9zMJI4elJPFfAN').update({ name: '' })
// const newValue = prompt('What is your entry?', 'default value');

export default class MenuEntries extends React.Component {
    state = {
        isSignedIn: false,
        item: {}
    };

    componentDidMount() {
        this.unsubscribe = db.collection('foodToGo')
            .onSnapshot(snapshot => { this.setState({ entries: snapshot.docs }); });
    }
    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    addToCart = (entry) => (e) => {
        e.preventDefault();
        console.log(entry);

        const uid = firebase.auth().currentUser.uid;
        db.collection('clients').doc(uid)
            .collection('foodToGo').add({
                orderDate: new Date()
                // item: this.state.doc
            })

        return (e) => {
            console.log(this.state.data);
            // this.orderArray.push(entry)
        }
    }

    render() {
        // this.state.entries.map(entry => console.log(entry.data()));  //return array 

        const listItems = this.state.entries.map(entry => <tr key={entry.id}>
            <td>{entry.data().dish}</td>
            <td>${entry.data().price}</td>
            <td>  <button onClick={this.addToCart(entry.data())} type="submit">order it</button> </td>
        </tr>);
        // console.log(this.state.entries.map(entry => entry.id));
        // const listItems = this.state.journalEntries.map(entry => <JournalEntry key={entry.id} entry={entry} />);
        return (
            <table className="table table-striped">
                <thead>
                    <tr><th>Entry</th><th>Price</th><th>{' '}</th></tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </table >
        )
    }
}