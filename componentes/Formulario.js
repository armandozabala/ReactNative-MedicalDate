import { transformFile } from '@babel/core';
import React, {useState} from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Button,
    Alert,
    FlatList,
    useColorScheme,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TextInput,
    TouchableHighlight
  } from 'react-native';
  import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas, setMostrar}) => {

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sintomas, setSintomas] = useState('');
   
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };


    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
  
    const confirmarFecha = (date) => {
       
        const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
        
        setFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };


    const confirmarHora = (hor) => {
        const opciones = { hour: 'numeric', minute: '2-digit'};
        setHora(hor.toLocaleTimeString('en-US', opciones));
        hideTimePicker();
      };
  

    const crearNuevaCita = () => {
            if( paciente.trim() === '' ||  
                propietario.trim() === '' ||  
                telefono.trim() === '' ||
                sintomas.trim() === '' ||
                hora.trim() === '' ||
                fecha.trim() === '' 
                ){
                    monstrarAlerta();

                    return;
                }

                const cita = { paciente, propietario, telefono, fecha, hora, sintomas};
                cita.id = shortid.generate();


                const citasNuevo = [...citas, cita];
                setCitas(citasNuevo);
                setMostrar(false);


    }

    //Alerta
    const monstrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    return (
        <>
        <ScrollView style={style.formulario}>
            <View>
                 <Text style={style.label}>Paciente</Text>
                 <TextInput style={style.input}
                            onChangeText = { (texto) => setPaciente(texto)}
                 />
            </View>
            <View>
                 <Text style={style.label}>Dueño</Text>
                 <TextInput style={style.input}
                            onChangeText = { (texto) => setPropietario(texto)}
                 />
            </View>
            <View>
                 <Text style={style.label}>Contacto</Text>
                 <TextInput style={style.input}
                            onChangeText = { (texto) => setTelefono(texto)}
                            keyboardType='numeric'
                 />
            </View>
            <View>
                <Text style={style.label}>Fecha:</Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS='Seleccione Fecha'
                    cancelTextIOS='Cancelar'
                    confirmTextIOS='Confirmar'
                />
                <Text>{fecha}</Text>
            </View>
            <View>
                <Text style={style.label}>Hora:</Text>
                <Button title="Seleccionar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    headerTextIOS='Seleccione Hora'
                    cancelTextIOS='Cancelar'
                    confirmTextIOS='Confirmar'
                />
                <Text>{hora}</Text>
            </View>
            <View>
                 <Text style={style.label}>Síntomas</Text>
                 <TextInput style={style.input}
                            onChangeText = { (texto) => setSintomas(texto)}
                            multiline
                 />
            </View>
            <View> 
                <TouchableHighlight onPress={ () => crearNuevaCita() } style={style.btnSubmit}>
                        <Text style={style.textoSubmit}> Crear Nueva Cita </Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
    formulario:{
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginHorizontal: '2.5%'
    },  
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input:{
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit:{
        padding: 10,
        backgroundColor: '#AA076B',
        marginVertical: 10
    },
    textoSubmit:{
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default Formulario
