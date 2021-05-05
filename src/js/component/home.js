import React, { useState, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [songList, setSongList] = useState([]);

	const obtenerSong = async () => {
		try {
			const respuesta = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await respuesta.json();
			setSongList(data);
		} catch (error) {
			console.log(error);
		}
	};

	obtenerSong();

	const audio = useRef();
	const [songActual, setSongActual] = useState();

	const playPause = () => {
		if (audio.current.paused) {
			audio.current.play();
		} else if (audio.current.play) {
			audio.current.pause();
		}
	};
	const next = () => {
		let nextSong = songActual + 1;
		if (nextSong > songList.length - 1) {
			nextSong = 0;
		}
		cambiarSrcAudio(songList[nextSong].url, nextSong);
		playPause();
	};

	const back = () => {
		let backSong = songActual - 1;
		if (backSong < 0) {
			backSong = songList.length - 1;
		}
		cambiarSrcAudio(songList[backSong].url, backSong);
		playPause();
	};

	const cambiarSrcAudio = (url, i) => {
		const linkFijo = "https://assets.breatheco.de/apis/sound/";
		audio.current.src = linkFijo + url;
		setSongActual(i);
	};

	// const escuchar = () => {
	// 	audio.current.src = linkFijo + objeto.url;
	// };

	// console.log(songList[0].url);

	return (
		<div className="box df">
			<div className="contenedor">
				{songList.map((objeto, index) => {
					return (
						<div
							className={
								"estilos " +
								(songActual == index ? "active" : "")
							}
							key={index}
							onClick={() => {
								cambiarSrcAudio(objeto.url, index);
								audio.current.play();
							}}>
							<span>{objeto.id}</span>
							<span>{objeto.name}</span>
						</div>
					);
				})}
				<audio
					ref={audio}
					src="https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"></audio>
			</div>
			<div className="botones df">
				<button onClick={back}>⏪</button>
				<button onClick={playPause}>⏯</button>
				<button onClick={next}>⏩</button>
			</div>
		</div>
	);
}
