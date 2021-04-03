/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  useColorScheme,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  View,
  Platform
} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';




const App = () => {

  const  [mostrar, setMostrar] = useState(false);

  const [citas, setCitas] = useState([
      {id: "1", paciente: "Hook", propietario: 'Juan', sintomas: 'No Come'},
      {id: "2", paciente: "Redux", propietario: 'Carlo', sintomas: 'No Come'},
      {id: "3", paciente: "Native", propietario: 'Pedro', sintomas: 'No Come'},
  ]);

  //elimina paciente
  const eliminarPaciente = id => {
     setCitas( (citasActuales) => {
          return citasActuales.filter( cita => cita.id !== id)
     })

  }

  const mostandoFor = () => {

    setMostrar(!mostrar);

  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }


  return (
    <TouchableWithoutFeedback onPress={cerrarTeclado}> 
       <View style={styles.contenedor}>
           <Text style={styles.titulo}> Administrador de Citas </Text>
           
           <View> 
                <TouchableHighlight onPress={ mostandoFor } style={styles.btnMostrar}>
                        <Text style={styles.textoMostrar}> Crear Nueva Cita </Text>
                </TouchableHighlight>
            </View>

           <View style={styles.contenido}>

             {
                 mostrar ? (
                    <>
                      <Text style={styles.textoMostrar}> Crear Nueva Cita </Text>
                      <Formulario citas={citas} 
                                  setCitas={setCitas}
                                  setMostrar={setMostrar}
                                  style={styles.contenido}/>
                    </>
                 ): (
                  <>
                    <Text style={styles.titulo}> { citas.length > 0 ? 'Administra tus citas' : 'No hay citas'} </Text>

                    <FlatList
                        style={styles.listado}
                        data={citas}
                        renderItem={ ({item}) => (
                            <Cita cita={item} eliminarPaciente={eliminarPaciente} />
                        )
                        }
                        keyExtractor = { cita => cita.id}
                    />
                  </>
                 )
             }

          

           
            </View>

          
       </View>
       </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  contenedor:{
    backgroundColor: '#AA076B',
    flex: 1
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
     flex: 1,
  },
  btnMostrar:{
    padding: 10,
    backgroundColor: '#AA075B',
    marginVertical: 10
},
textoMostrar:{
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
}
});

export default App;
