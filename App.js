import { StatusBar } from "expo-status-bar";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// Using DB Reference
import { db } from "./Core/Config";

export default function App() {
  // Storing User Data
  const [userDoc, setUserDoc] = useState(null);
  // Update Text
  const [text, setText] = useState("");

  // MARK: CRUD Functions
  const Create = () => {
    // MARK: Creating New Doc in Firebase
    // Before that enable Firebase in Firebase Console
    const myDoc = doc(db, "MyCollection", "MyDocument");

    // Your Document Goes Here
    const docData = {
      name: "Matheus",
      bio: "Desenvolvedor",
    };

    setDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Documento Criado!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here
    const myDoc = doc(db, "MyCollection", "MyDocument");

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("Não foi possível encontrar o documento.");
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Update = (value, merge) => {
    // MARK: Updating Doc
    const myDoc = doc(db, "MyCollection", "MyDocument");

    // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
    setDoc(myDoc, value, { merge: merge })
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Documento atualizado com sucesso!");
        setText("");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "MyCollection", "MyDocument");

    deleteDoc(myDoc)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Documento deletado com sucesso!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          width: "95%",
          fontSize: 18,
          padding: 12,
          borderColor: "gray",
          borderWidth: 0.2,
          borderRadius: 10,
          marginVertical: 20,
        }}
        placeholder="Escreva o nome do documento aqui"
        onChangeText={(text) => {
          setText(text);
        }}
        value={text}
      ></TextInput>
      <Button title="Criar novo documento" onPress={Create}></Button>
      <Button title="Ler um documento" onPress={Read}></Button>
      {userDoc != null && <Text>Cargo: {userDoc.bio}</Text>}
      <Button title="Atualizar documento" onPress={() => {
          Update({ Cargo: text,
            },
            true
          );
        }}disabled={text == ""}/>
      <Button title="Deletar documento" onPress={Delete}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
