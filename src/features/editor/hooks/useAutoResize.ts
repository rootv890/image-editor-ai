import React, { useCallback, useEffect } from 'react';
import { fabric } from 'fabric';
interface useAutoResizeProps {
	canvas: fabric.Canvas | null;
	container: HTMLDivElement | null;
}

export const useAutoResize = ({ canvas, container }: useAutoResizeProps) => {
	// AutoZoom
	const autoZoom = useCallback(() => {
		if (!canvas || !container) return;

		const width = container.offsetWidth;
		const height = container.offsetHeight;

		canvas.setWidth(width);
		canvas.setHeight(height);

		const center = canvas.getCenter();
		const zoomRatio = 0.85; // 85% zoom

		const localWorkspace = canvas.getObjects().find(obj => obj.name === 'clip');

		// @ts-ignore
		const scale = fabric.util.findScaleToFit(localWorkspace, {
			width: width,
			height: height,
		});
		const zoom = zoomRatio * scale; // 85% zoom

		canvas.setViewportTransform(fabric.iMatrix.concat());

		canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

		if (!localWorkspace) return;

		const workspaceCenter = localWorkspace.getCenterPoint();
		const viewportTransform = canvas.viewportTransform;

		if (
			canvas.width === undefined ||
			canvas.height === undefined ||
			!viewportTransform
		) {
			return;
		}

		viewportTransform[4] =
			canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

		viewportTransform[5] =
			canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

		canvas.setViewportTransform(viewportTransform);
		localWorkspace.clone((cloned: fabric.Rect) => {
			canvas.clipPath = cloned;
			canvas.requestRenderAll();
		});
	}, [container, canvas]);

	useEffect(() => {
		let resizeObserver: ResizeObserver | null = null;

		if (canvas && container) {
			resizeObserver = new ResizeObserver(() => {
				// AutoZoom
				autoZoom();
			});
			resizeObserver.observe(container);
		}

		// Clean up the observer
		return () => {
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, [canvas, container, autoZoom]);

	return { autoZoom };
};

/** Notes
 * - This hook is used to observe the resizing of the container element.
 * - It uses the ResizeObserver API to observe the container element.
 * - The observer is created when both the canvas and container are available.
 * - The observer is disconnected when the canvas or container is removed.
 * - The observer callback logs 'resizing' to the console.
 *
 *
 * - ResizeObserver API:
 * - Is a JS API that allows you to observe changes to an element's size' border-box.
 * - It is useful for observing changes to the size of an element, such as when the window is resized or when the element's content changes.
 **/
