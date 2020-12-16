import { StatusBar } from 'expo-status-bar';

import React, { useEffect, Component, useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, PanResponder, Animated } from 'react-native'

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

let AREA = { height: 0, width: 0, x: 0, y: 0 };

let CIRCLE_RADIUS = 15;
let styles = StyleSheet.create({
	circle: {
		backgroundColor: "skyblue",
		width: CIRCLE_RADIUS * 2,
		height: CIRCLE_RADIUS * 2,
		borderRadius: CIRCLE_RADIUS
	},
	container: {
		width: '100%',
		height: '100%',
		borderWidth: 2,
	},
	super: {
		padding: 30,
		height: '100%',
	}
});


const Draggable2 = ({ setCurrentPosition }) => {
	const listener = (evt) => {
		// console.log(evt);
	}

	const ponto = { height: 40, width: 40, x: 0, y: 0 };

	const pan = useRef(new Animated.ValueXY()).current;
	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: () => {
				pan.setOffset({
					x: pan.x._value,
					y: pan.y._value
				});
			},
			onPanResponderMove: Animated.event(
				[
					null,
					{ dx: pan.x, dy: pan.y }
				], { useNativeDriver: false, listener }
			),
			onPanResponderRelease: () => {
				console.log(AREA);

				const x = pan.x;
				const y = pan.y;

				setCurrentPosition({ x, y })

				if (x < 0) {
					pan.setValue({ x: 0, y });
				}
				if (x > AREA.width - ponto.width) {
					pan.setValue({ x: AREA.width - ponto.width, y });
				}

				if (pan.y < 0) {
					pan.setValue({ x, y: 0 });
				}
				if (pan.y > AREA.height - ponto.height) {
					pan.setValue({ x, y: AREA.height - ponto.height });
				}

				pan.flattenOffset();
			}
		})
	).current;

	useEffect(() => {
		pan.setValue({ x: ponto.x, y: ponto.y });
	}, [])

	return (
		<Animated.View
			{...panResponder.panHandlers}
			style={{
				transform: [{ translateX: pan.x }, { translateY: pan.y }],
				borderColor: 'black',
				borderWidth: 1,
				width: ponto.width,
				height: ponto.height
			}}
		>
			<Text selectable={false}> <MaterialCommunityIcons name="crosshairs-gps" size={30} color="black" /></Text>
		</Animated.View>
	);
}

// class Draggable extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			// objeto com x e y de posição inicial
// 			pan: new Animated.ValueXY({ x: 0, y: 0 }),
// 			currentX: 0,
// 			currentY: 0,
// 		};
// 	}

// 	// METODO X E Y PARA VER O TAMANHO MÁXIMO DO BOX DRAGABLE
// 	// SE RETORNAR TRUE, ATUALIZA O POSITION
// 	// SE RETORNAR FALSE, NÃO MOVE MAIS
// 	setXWithMaxCanvasSize = (x, y) => {
// 		if (x <= 295 && y <= 290) return true;
// 		return false;
// 	}

// 	componentWillMount() {
// 		this._val = { x: 1.8181781768798828, y: 292.00000762939453 }

// 		this.state.pan.addListener((value) => this._val = value);
// 		this.panResponder = PanResponder.create({
// 			onStartShouldSetPanResponder: (e, gesture) => true,
// 			// METODO QUE RECEBE AS ATUALIZAÇÕES DE POSIÇÃO ENQUANTO MOVE O OBJETO
// 			// SE O GESTURE.MOVEX > 295 PARA DE MOVER O OBJETO
// 			// SE O GESTURE.MOVEY > 290 PARA DE MOVER O OBJETO
// 			// O METODO PERMITE O MOVIMENTO ENQUANTO A FUNÇÃO SETXWITHMAXCANVASSIZE RETORNAR TRUE
// 			onMoveShouldSetPanResponder: (e, gesture) => this.setXWithMaxCanvasSize(gesture.moveX, gesture.moveY),
// 			// METODO QUE EXECUTA ASSIM QUE RECEBERMOS A AÇÃO DE MOVIMENTAÇÃO
// 			// QUANDO MOVER O OBJETO DEFINE O X E Y PARA VALORES DIFERENTES
// 			onPanResponderGrant: (e, gesture) => {
// 				this.state.pan.setOffset({
// 					x: this.state.pan.x._value,
// 					y: this.state.pan.y._value,
// 				});

// 				// RESETA A POSIÇÃO DO PAN PARA A POSIÇÃO INICIAL
// 				this.state.pan.setValue({ x: 0, y: 0 });
// 			},
// 			onPanResponderMove: Animated.event([
// 				null,
// 				{ dx: this.state.pan.x, dy: this.state.pan.y }
// 			], {
// 				// LISTENER QUE POSSUI ACESSO AO STATE DO GESTURE
// 				// COM ELE É POSSÍVEL SETAR OS VALORES DE ESTADOS BASEADOS
// 				// NA POSICAO DO OBJETO
// 				listener: (e, gesture) => {
// 					console.log(
// 						'STATE DO X', gesture.moveX,
// 						'STATE DO Y', gesture.moveY,
// 					)
// 					// RECUPERA DAS PROPS PASSADAS O METODO SET CURRENT POSITION DO COMPONENTE PAI
// 					// E SETA OS VALORES DO ESTADO
// 					this.props.setCurrentPosition({
// 						x: gesture.moveX,
// 						y: gesture.moveY,
// 					});
// 				}
// 			}),
// 			// METODO QUE EXECUTA AO SOLTAR O DRAG
// 			onPanResponderRelease: (e, gesturestate) => {
// 				// ATUALIZA A POSIÇÃO INICIAL DO DRAG PARA A POSIÇÃO EM QUE FOI SOLTO
// 				// ISSO GARANTE QUE O OBJETO SE MANTENHA NA POSIÇÃO EM QUE FOI SOLTO
// 				// E DEFINE O X:0 e Y:0 COMO SENDO A POSICAO EM QUE FOI SOLTO
// 				this.state.pan.flattenOffset();
// 			},
// 		})

// 	}


// 	render() {
// 		const panStyle = { transform: this.state.pan.getTranslateTransform() };
// 		return (
// 			<Animated.View {...this.panResponder.panHandlers} style={[styles.circle, panStyle]} >
// 				<Text selectable={false}> <MaterialCommunityIcons name="crosshairs-gps" size={30} color="black" />
// 				</Text>
// 			</Animated.View>
// 		);
// 	}
// }


export default function App() {
	const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });


	useEffect(() => {
		console.log('HI');
	}, [])

	return (
		<View style={{ flex: 1, margin: 20, marginTop: 70 }}>

			<View style={{ flex: 1, borderColor: 'black', borderWidth: 3, }}>
				<View style={styles.container} onLayout={(evt) => AREA = evt.nativeEvent.layout}>
					{/* PASSAR O SETCURRENTPOSITION PARA PODER ATUALIZAR O ESTADO DO COMPONENTE A PARTIR DO COMPONENTE FILHO */}
					<Draggable2 setCurrentPosition={setCurrentPosition} />
				</View>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={{ marginRight: 4 }}>Posição:</Text>
				<Text style={{ fontWeight: 'bold' }}>x = {currentPosition.x} , y = {currentPosition.y}</Text>
			</View>

			<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<View >
					<TouchableOpacity style={{ backgroundColor: '#e6e6e6', padding: 8, margin: 4, borderRadius: 2 }}>
						<AntDesign name="pausecircle" size={24} color="black" />
					</TouchableOpacity>

					<TouchableOpacity style={{ backgroundColor: '#e6e6e6', padding: 8, margin: 4, borderRadius: 2 }}>
						<Entypo name="retweet" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>

			<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Text>Tamanho do passo: 10mm</Text>
			</View>

			<View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
				<Text style={{ marginRight: 200 }}>Disparo Rapido</Text>
				<TouchableOpacity style={{ backgroundColor: '#0075A0', padding: 8, margin: 4, borderRadius: 2, marginRight: 250 }}>
					<AntDesign name="closecircle" size={24} color="black" />
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				<TouchableOpacity style={{ margin: 8, backgroundColor: '#0075A0', padding: 8, paddingHorizontal: 35, }}>
					<Text style={{ color: "white" }}>Due It!</Text>
				</TouchableOpacity>

				<TouchableOpacity style={{ margin: 8, backgroundColor: '#e6e6e6', padding: 8, paddingHorizontal: 35 }}>
					<Text>Cancelar</Text>
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: 'row' }}>
				<Text style={{ marginRight: 8 }}>Situação:</Text>
				<Text style={{ fontWeight: 'bold' }}>Tampa de segurança aberta</Text>
			</View>

			<Text>Tempo decorrido:</Text>
			<Text>Tempo estimado:</Text>

			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				<TouchableOpacity style={{ backgroundColor: '#e6e6e6', padding: 8, margin: 4, borderRadius: 2, }}>
					<Entypo name="arrow-bold-up" size={24} color="black" />
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				<TouchableOpacity style={{ backgroundColor: '#e6e6e6', padding: 8, margin: 4, borderRadius: 2, }}>
					<Entypo name="arrow-bold-left" size={24} color="black" />
				</TouchableOpacity>

				<TouchableOpacity style={{ backgroundColor: '#e6e6e6', padding: 8, margin: 4, borderRadius: 2 }}>
					<Entypo name="arrow-bold-down" size={24} color="black" />
				</TouchableOpacity>

				<TouchableOpacity style={{ backgroundColor: '#e6e6e6', padding: 8, margin: 4, borderRadius: 2 }}>
					<Entypo name="arrow-bold-right" size={24} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

