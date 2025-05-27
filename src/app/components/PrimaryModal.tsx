import React, { ReactNode, useCallback, useRef } from "react";

export default function PrimaryModal({
                                         children,
                                         showModal,
                                         setShowModal,
                                         onCloseModal,
                                         showCloseButton = true,
                                         isOpen
                                     }: {
    children?: ReactNode,
    showModal: boolean,
    setShowModal: (value: boolean) => void,
    onCloseModal?: () => void,
    showCloseButton?: boolean,
    isOpen?: boolean
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        if (onCloseModal) onCloseModal();
    }, [setShowModal, onCloseModal]);

    const handleOverlayClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                handleCloseModal();
            }
        },
        [modalRef, handleCloseModal]
    );

    return (
        <>
            {showModal && (
                <>
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/30 z-20"></div>

                    {/* Modal Container */}
                    <div
                        className="fixed inset-0 z-30 flex items-center justify-center px-4 py-8 overflow-y-auto"
                        onClick={handleOverlayClick}
                    >
                        <div
                            ref={modalRef}
                            className="bg-[#f3f6fb] w-full sm:max-w-md md:max-w-2xl rounded-2xl shadow-xl p-4 md:p-6
                         max-h-[calc(100vh-15rem)] overflow-y-auto"
                        >
                            {children}

                            {showCloseButton && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleCloseModal}
                                        className="px-4 py-2 text-sm bg-blue-200 hover:bg-gray-300 rounded-md"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
